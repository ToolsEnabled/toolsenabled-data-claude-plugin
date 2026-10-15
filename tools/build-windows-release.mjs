// Build the committed public payload as a reproducible Windows ZIP; no dependencies.
import {execFileSync} from 'node:child_process';
import {mkdir, readFile, writeFile} from 'node:fs/promises';
import {createHash} from 'node:crypto';
import {resolve, join} from 'node:path';
import {fileURLToPath} from 'node:url';
const root = fileURLToPath(new URL('../', import.meta.url));
const output = resolve(process.argv[2] || '.');
const {version} = JSON.parse(await readFile(join(root, '.claude-plugin/plugin.json'), 'utf8'));
const archive = execFileSync('git', ['archive', '--format=zip', '--prefix=toolsenabled-data/', 'HEAD'], {cwd: root, maxBuffer: 32 * 1024 * 1024});
const name = 'toolsenabled-data-' + version + '-windows-x64.zip';
const digest = createHash('sha256').update(archive).digest('hex');
await mkdir(output, {recursive: true});
await writeFile(join(output, name), archive);
await writeFile(join(output, name + '.sha256'), digest + '  ' + name + '\n');
console.log(digest + '  ' + name + ' (' + archive.length + ' bytes)');
