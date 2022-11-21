import { base, remove } from '../../_/file/data.js';
import { read, write } from '../../_/file/json.js';
import fs from 'fs';
const dir = 'tweets';
const path = (twt) => {
    if (typeof twt === 'string')
        return [dir, twt];
    return [dir, twt.id];
};
const post = (twt) => {
    return write(path(twt), twt);
};
const destroy = (id) => {
    return remove(path(id));
};
const timeline = () => {
    return new Promise((resolve, reject) => {
        fs.readdir(base(dir), (err, files) => {
            if (err)
                return reject(err);
            files.sort((a, b) => {
                return a.localeCompare(b);
            });
            let line = [];
            const grab = () => {
                let take = files.splice(0, 100);
                if (!take.length)
                    return resolve(line);
                let get = take.map(id => read(path(id)));
                Promise.all(get).then(res => {
                    line.push(...res);
                    grab();
                }, reject);
            };
            grab();
        });
    });
};
export default {
    timeline,
    destroy,
    post
};
