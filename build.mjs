import {cp, mkdir, readdir, rm, stat} from 'node:fs/promises';
import path from 'node:path';
import {fileURLToPath} from 'node:url';

const root=path.dirname(fileURLToPath(import.meta.url));
const output=path.join(root,'dist');
// An explicit list prevents dependencies, Git data and server tools being published.
const publicFiles=['index.html','life.html','style.css','app.js','globe.js','motion.js','interests.js','assets'];
await rm(output,{recursive:true,force:true});
await mkdir(output,{recursive:true});
for(const file of publicFiles)await cp(path.join(root,file),path.join(output,file),{recursive:true});
let count=0,maxSize=0,maxFile='';
async function validate(directory){for(const entry of await readdir(directory,{withFileTypes:true})){const file=path.join(directory,entry.name);if(entry.isDirectory()){await validate(file);continue;}const {size}=await stat(file);if(size>25*1024*1024)throw new Error(`Cloudflare asset exceeds 25 MiB: ${path.relative(output,file)}`);count++;if(size>maxSize){maxSize=size;maxFile=path.relative(output,file);}}}
await validate(output);
console.log(`Built ${count} public files in dist. Largest: ${maxFile} (${(maxSize/1024/1024).toFixed(2)} MiB).`);
