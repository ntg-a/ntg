import mime from 'mime-types';
import http from 'http';
const request = (req) => {
    req.method = req.method?.toUpperCase();
    return Object.assign(req, {
        data: () => new Promise((resolve, reject) => {
            let data = '';
            req.setEncoding('utf8');
            req.on('data', chunk => data += chunk);
            req.on('end', () => resolve(data));
            req.on('error', reject);
        })
    });
};
const response = (res) => {
    let headers = {};
    return Object.assign(res, {
        send: (status, data, file) => {
            if (file)
                headers['Content-Type'] = mime.lookup(file) || 'text/plain';
            if (data && typeof data !== 'string' && !Buffer.isBuffer(data))
                data = JSON.stringify(data);
            if (data && !Buffer.isBuffer(data))
                data = Buffer.from(data);
            if (data)
                headers['Content-Length'] = `${data.length}`;
            res.writeHead(status, headers);
            if (!data)
                res.end();
            else
                res.end(data);
        }
    });
};
const server = (port) => {
    const server = http.createServer();
    const listen = (cb) => {
        if (cb)
            server.on('request', (req, res) => cb(request(req), response(res)));
        if (!server.listening)
            server.listen(port, 'localhost');
    };
    return {
        http: server,
        listen,
        port
    };
};
export default server;
