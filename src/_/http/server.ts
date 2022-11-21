import mime from 'mime-types';
import http from 'http';



const request = (req: http.IncomingMessage) => {

    req.method = req.method?.toUpperCase();

    return Object.assign(req, {
        data: () => new Promise<string>((resolve, reject) => {
            let data = '';
            req.setEncoding('utf8');
            req.on('data', chunk => data += chunk);
            req.on('end', () => resolve(data));
            req.on('error', reject);
        })
    })
}



const response = (res: http.ServerResponse) => {

    let headers = {

    }

    return Object.assign(res, {
        send: (status: number, data?: any, file?: string) => {
            if (file) headers['Content-Type'] = mime.lookup(file) || 'text/plain';
            if (data && typeof data !== 'string' && !Buffer.isBuffer(data)) data = JSON.stringify(data);
            if (data && !Buffer.isBuffer(data)) data = Buffer.from(data);
            if (data) headers['Content-Length'] = `${data.length}`;
            res.writeHead(status, headers);
            if (!data) res.end();
            else res.end(data);
        }
    })
}



type Req = ReturnType<typeof request>;
type Res = ReturnType<typeof response>;
type Server = ReturnType<typeof server>;

const server = (port: number) => {
    const server = http.createServer();

    const listen = (cb?: (req: Req, res: Res) => void) => {
        if (cb) server.on('request', (req, res) => cb(request(req), response(res)));
        if (!server.listening) server.listen(port, 'localhost');
    }

    return {
        http: server,
        listen,
        port
    }
}



export type { Server };
export default server;
