import { base, remove } from '@_/file/data';
import { read, write } from '@_/file/json';
import { Tweet } from '@/twt';
import fs from 'fs';



const dir = 'tweets';

type Id = Tweet | string;
const path = (twt: Id) => {
    if (typeof twt === 'string') return [dir, twt];
    return [dir, twt.id];
}



const post = (twt: Tweet) => {
    return write(path(twt), twt);
}



const destroy = (id: Id) => {
    return remove(path(id));
}



const timeline = () => {
    return new Promise<Tweet[]>((resolve, reject) => {
        fs.readdir(base(dir), (err, files) => {
            if (err) return reject(err);

            files.sort((a, b) => {
                return a.localeCompare(b);
            })

            let line: Tweet[] = [];

            const grab = () => {
                let take = files.splice(0, 100);
                if (!take.length) return resolve(line);
                let get = take.map(id => read(path(id)));
                Promise.all(get).then(res => {
                    line.push(...res);
                    grab();
                }, reject);
            }

            grab();
        })
    })
}



export default {
    timeline,
    destroy,
    post
}
