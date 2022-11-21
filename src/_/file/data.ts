import { rebase, Path } from '@_/file/root';
import fs, { constants } from 'fs';



const dir = 'data';
const base = rebase(dir);



const exists = (path: Path) => {
    return new Promise<boolean>((resolve, reject) => {
        fs.access(base(path), constants.F_OK, err => {
            if (err?.code === 'ENOENT') {
                return resolve(false);
            }
 
            if (err) return reject(err);
            return resolve(true);
        })
    })
}



const remove = (path: Path) => {
    return new Promise<boolean>((resolve, reject) => {
        fs.rm(base(path), { recursive: true }, err => {
            if (err?.code === 'ENOENT') {
                return resolve(false);
            }

            if (err) return reject(err);
            return resolve(true);
        })
    })
}



export type { Path };
export { base, exists, remove };
