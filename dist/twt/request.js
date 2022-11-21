import { query } from '../_/text/enc.js';
import fetch from '../_/http/client.js';
import auth from '../twt/auth.js';
import bear from '../twt/bear.js';
const api = 'https://api.twitter.com/1.1';
const defaults = {};
const request = (type, method, url, config) => {
    if (!url.startsWith('https://') && !url.startsWith('http://')) {
        if (!url.startsWith('/'))
            url = '/' + url;
        url = api + url;
    }
    let headers = { ...defaults };
    if (config?.body)
        Object.assign(headers, {
            'Content-Type': 'application/x-www-form-urlencoded'
        });
    if (type === 'user')
        Object.assign(headers, {
            'Authorization': auth(method, url, {
                ...config?.query,
                ...config?.body
            })
        });
    if (type === 'app')
        Object.assign(headers, {
            'Authorization': bear()
        });
    if (config?.headers)
        Object.assign(headers, {
            ...config.headers
        });
    return fetch(url, {
        body: query(config?.body),
        query: config?.query,
        headers,
        method
    });
};
export default request;
