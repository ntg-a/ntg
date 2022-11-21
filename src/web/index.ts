import { rebase } from '@_/file/root';
import server from '@_/http/server';
import socket from '@_/http/socket';
import event from '@_/base/event';
import fs from 'fs';



const dir = 'web';
const base = rebase(dir);
const root = base('');



type Msg = (msg: string, cb: (a: any) => void) => any;

const _ = {
    ...event<Msg>(),
    api: socket(server(8080))
}



const broadcast = data => {
    _.api.clients.forEach(client => {
        client.write(data);
    })
}



const resource = (url: string) => {
    let query = url.search(/[\?\#]/);
    if (query >= 0) url = url.slice(0, query);

    let i = url.lastIndexOf('/');
    if (0 <= i && i < url.length - 1) {
        let end = url.slice(i + 1, -1);
        if (!end.includes('.')) {
            url += '/';
        }
    }

    if (!url.startsWith('/')) url = '/' + url;
    if (url.endsWith('/')) url += 'index.html';

    return root + url;
}



const init = () => {
    _.api.listen((req, res) => {
        if (req.method === 'GET') {
            let file = resource(req.url || '');
            return fs.readFile(file, (err, data) => {
                let notfound = err?.code === 'ENOENT';
                if (notfound) return res.send(404);
                if (err) return res.send(500);
                res.send(200, data, file);
            })
        }

        else if (req.method === 'POST') {
            return req.data().then(msg => {
                _.send(msg, broadcast).then(data => {
                    res.send(200, data);
                }, err => res.send(500, err));
            }, () => res.send(500));
        }

        else {
            res.send(400);
        }
    })
}



export default {
    ..._.event,
    api: _.api,
    broadcast,
    init
}
