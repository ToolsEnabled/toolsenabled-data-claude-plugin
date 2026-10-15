// Explicit setup helper for the Windows installer; no server or model is started.
import {setup, pythonStatus, dataDirectory} from '../server/tedata-server-03-tedata.mjs';
const args = process.argv.slice(2);
if (args.length !== 1 || !['--install', '--status'].includes(args[0])) {
 console.error('Usage: node tools/setup-runtime.mjs --install|--status');
 process.exitCode = 2;
} else {
 try {
  const result = args[0] === '--install' ? await setup() : await pythonStatus();
  console.log(JSON.stringify({...result, dataDirectory: dataDirectory()}));
  if (!result.ready) process.exitCode = 1;
 } catch (error) { console.error(error.message); process.exitCode = 1; }
}
