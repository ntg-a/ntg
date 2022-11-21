import { query } from '../text/enc.js';
import https from 'https';
import trm from '../../trm/index.js';
import web from '../../web/index.js';
const fetch = (url, config) => {
    if (config.body && typeof config.body !== 'string') {
        config.body = JSON.stringify(config.body);
    }
    let add = query(config.query);
    if (add && !url.includes('?'))
        url += '?';
    else if (add && !url.endsWith('&'))
        url += '&';
    if (add)
        url += add;
    let msg = { url };
    web.broadcast(msg);
    trm.log(msg);
    let options = {
        method: config.method,
        headers: config.headers
    };
    return new Promise((resolve, reject) => {
        const req = https.request(url, options, res => {
            let code = res?.statusCode || 0;
            if (200 > code || code > 299) {
                return reject(code);
            }
            let data = '';
            res.setEncoding('utf8');
            res.on('data', chunk => data += chunk);
            res.on('end', () => resolve(JSON.parse(data)));
            res.on('error', reject);
        });
        if (config.body)
            req.write(config.body);
        req.on('error', reject);
        req.end();
    });
};
export default fetch;
