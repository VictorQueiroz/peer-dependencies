#!/usr/bin/env node

import fs from 'fs';
import path from 'path';

(async () => {
    const filePath = path.resolve(process.cwd(),'package.json');
    const packageJson = JSON.parse(await fs.promises.readFile(
        filePath,
        'utf8'
    ));
    const peerDependencies = Object.entries(packageJson.peerDependencies??{});
    if(!peerDependencies.length){
        throw new Error(`no peer dependencies found on file: ${filePath}`);
    }
    for(const dep of peerDependencies){
        const [name,version] = dep;
        process.stdout.write(`${name}@${version}`);
        if(dep !== peerDependencies[peerDependencies.length - 1]){
            process.stdout.write(' ');
        }
    }
})().catch(reason => {
    console.error(reason);
    process.exitCode = 1;
})
