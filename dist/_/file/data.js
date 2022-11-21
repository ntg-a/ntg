import { rebase } from '../file/root.js';
import fs, { constants } from 'fs';
const dir = 'data';
const base = rebase(dir);
const exists = (path) => {
    return new Promise((resolve, reject) => {
        fs.access(base(path), constants.F_OK, err => {
            if (err?.code === 'ENOENT') {
                return resolve(false);
            }
            if (err)
                return reject(err);
            return resolve(true);
        });
    });
};
const remove = (path) => {
    return new Promise((resolve, reject) => {
        fs.rm(base(path), { recursive: true }, err => {
            if (err?.code === 'ENOENT') {
                return resolve(false);
            }
            if (err)
                return reject(err);
            return resolve(true);
        });
    });
};
export { base, exists, remove };
