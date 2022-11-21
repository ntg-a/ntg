import { base, exists, Path } from '@_/file/data';
import path from 'path';
import fs from 'fs';



const read = (file: Path, empty?: any) => {
    return new Promise<any>((resolve, reject) => {
        fs.readFile(base(file), 'utf8', (err, res) => {
            if (err?.code === 'ENOENT' || !res) {
                if (empty) return resolve(empty);
            }

            if (err) return reject(err);
            try { resolve(JSON.parse(res)); }
            catch (err) { reject(err); }
        })
    })
}



const write = (file: Path, data: any) => {
    return new Promise<boolean>((resolve, reject) => {
        fs.mkdir(path.dirname(base(file)), {
            recursive: true
        }, err => {
            if (err) return reject(err);
            if (typeof data !== 'string') {
                data = JSON.stringify(data);
            }

            exists(file).then(stored => {
                fs.writeFile(base(file), data, err => {
                    if (err) return reject(err);
                    return resolve(stored);
                })
            }, reject);
        })
    })
}



export { read, write };
