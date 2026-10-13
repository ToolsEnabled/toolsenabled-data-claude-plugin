// TE Data run monitor. Claude Code runs this as a plugin monitor: every line printed here
// reaches Claude as a notification, so long collection and preparation runs can finish
// without Claude polling. It only reads TE Data's own run records; it never changes anything.
import {readdir,readFile,stat} from 'node:fs/promises';
import {join,resolve} from 'node:path';

// Watch every run in the workspace, or one run (--run ID) and exit when it ends:
//   node tedata-watch.mjs [--workspace DIR] [--run RUN_ID] [--once]
const usage='Usage: node tedata-watch.mjs [--workspace DIR] [--run RUN_ID] [--once] [--help]';
const options=new Map();
for(let index=2;index<process.argv.length;index++){
 const name=process.argv[index];
 if(name==='--help'||name==='-h'){console.log(usage);process.exit(0);}
 if(!['--workspace','--run','--once'].includes(name)||options.has(name)){
  console.error(`Unknown or repeated option: ${name}\n${usage}`);process.exit(2);
 }
 if(name==='--once'){options.set(name,true);continue;}
 const value=process.argv[++index];
 if(!value||value.startsWith('--')){console.error(`Missing value for ${name}\n${usage}`);process.exit(2);}
 options.set(name,value);
}
const root=resolve(options.get('--workspace')||process.env.TEDATA_WORKSPACE||process.env.CLAUDE_PROJECT_DIR||process.cwd());
const only=options.get('--run');
const state=join(root,'.tedata');
const intervalMs=Number(process.env.TEDATA_WATCH_INTERVAL_MS)||10000;
// A run whose record has not changed for this long may have lost its TE Data server.
const stallMs=Number(process.env.TEDATA_WATCH_STALL_MS)||15*60000;
const once=options.has('--once');
const seen=new Map();// run file -> {state, step, stalled}
const count=value=>Number.isFinite(value)?value.toLocaleString('en-US'):'?';
const say=line=>process.stdout.write(line+'\n');

async function json(path){try{return JSON.parse(await readFile(path,'utf8'));}catch{return null;}}
async function dirs(path){try{return (await readdir(path,{withFileTypes:true})).filter(entry=>entry.isDirectory()).map(entry=>entry.name);}catch{return [];}}

async function collectionRuns(){
 const runs=[];
 for(const project of await dirs(join(state,'collections')))for(const id of await dirs(join(state,'collections',project))){
  const definition=await json(join(state,'collections',project,id,'definition.json'));
  for(const runId of await dirs(join(state,'collections',project,id,'runs'))){
   const path=join(state,'collections',project,id,'runs',runId,'state.json');
   runs.push({path,kind:'collection',name:definition?.filePlan?.name||'collection',ids:{collectionId:id,runId},unit:'files',next:'collection_get and collection_results',resume:'collection_resume'});
  }
 }
 return runs;
}
async function preparationRuns(){
 const runs=[];
 for(const project of await dirs(join(state,'preparations')))for(const planId of await dirs(join(state,'preparations',project,'runs'))){
  const plan=await json(join(state,'preparations',project,planId+'.json'));
  let names=[];try{names=(await readdir(join(state,'preparations',project,'runs',planId))).filter(name=>name.endsWith('.json'));}catch{}
  for(const name of names)runs.push({path:join(state,'preparations',project,'runs',planId,name),kind:'preparation',name:plan?.plan?.name||'preparation',ids:{planId,runId:name.slice(0,-5)},unit:'requirements',next:'preparation_get',resume:null});
 }
 return runs;
}

let finished=false;
const ending=(run,record,label,ids,completed,total)=>record.state==='complete'
 ?`${label} complete: ${count(completed)} of ${count(total)} ${run.unit}${record.summary?` (${count(record.summary.completedFiles??completed)} completed, ${count(record.summary.failedFiles||0)} failed)`:''}. Read the results with tedata_data ${run.next} (${ids}) and report them to the user.${run.kind==='collection'&&record.phase==='final'?' The prepared files can then be exported for the study with collection_export.':''}`
 :`${label} stopped (${record.state})${record.error?`: ${String(record.error).slice(0,300).replace(/\.+$/,"")}`:''}. ${run.resume?`It can be continued with tedata_data ${run.resume} (${ids}).`:`Check it with tedata_data ${run.next} (${ids}).`}`;
async function scan(first){
 for(const run of [...await collectionRuns(),...await preparationRuns()]){
  if(only&&run.ids.runId!==only)continue;
  const record=await json(run.path);if(!record)continue;
  const previous=seen.get(run.path),label=`TE Data ${run.kind} "${run.name}" ${record.phase||''} run`.replace(/\s+/g,' ');
  const ids=Object.entries(run.ids).map(([key,value])=>`${key} ${value}`).join(', ');
  const total=record.total,completed=record.completed||0,step=total?Math.floor(completed/total*10):0;
  const idle=Date.now()-(await stat(run.path).catch(()=>({mtimeMs:Date.now()}))).mtimeMs;
  seen.set(run.path,{state:record.state,step:Math.max(step,previous?.step??0),stalled:record.state==='running'&&idle>stallMs});
  if(!previous){
   if(only){
    // Watching one run: say where it stands; if it has already ended, report that and stop.
    if(record.state==='running')say(`${label} in progress: ${count(completed)} of ${count(total)} ${run.unit} (${ids}).${once?'':' Watching until it ends.'}`);
    else{say(ending(run,record,label,ids,completed,total));finished=true;}
   }else if(record.state==='running'){
    // Runs that had already finished when watching began are history, not news.
    if(!first)say(`${label} started: ${count(total)} ${run.unit} (${ids}).`);
    else if(idle<120000)say(`${label} in progress: ${count(completed)} of ${count(total)} ${run.unit} (${ids}).`);
   }
   continue;
  }
  if(record.state==='running'){
   if(step>previous.step&&step<10)say(`${label}: ${step*10}% (${count(completed)} of ${count(total)} ${run.unit}${record.summary?.failedFiles?`, ${count(record.summary.failedFiles)} failed`:''}).`);
   if(idle>stallMs&&!previous.stalled)say(`${label} has recorded no progress for ${Math.round(idle/60000)} minutes (${count(completed)} of ${count(total)} ${run.unit}). A single large file can take this long, but if TE Data was restarted the run has stopped: check it with tedata_data ${run.kind}_poll (${ids}).`);
  }else if(previous.state==='running'){say(ending(run,record,label,ids,completed,total));finished=true;}
 }
}

if(!once&&!only)say(`Watching TE Data runs in ${root}. Stop with Ctrl+C.`);
await scan(true);
if(only){
 if(finished)process.exit(0);
 if(!seen.size){say(`No TE Data run ${only} was found in ${root}.`);process.exit(1);}
 if(once)process.exit(0);
 const timer=setInterval(()=>{scan(false).then(()=>{if(finished){clearInterval(timer);process.exit(0);}}).catch(()=>{});},intervalMs);
}else if(!once){
 const timer=setInterval(()=>{scan(false).catch(()=>{});},intervalMs);
 process.on('SIGTERM',()=>{clearInterval(timer);process.exit(0);});
}
