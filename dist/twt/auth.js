import enc, { query, header } from '../_/text/enc.js';
import crypto from 'crypto';
const nonce = () => {
    let nonce = '';
    const rand = () => Math.random().toString(36).slice(2);
    for (let i = 0; i < 3; ++i)
        nonce += rand();
    return nonce;
};
const oauth = () => ({
    'oauth_version': '1.0',
    'oauth_signature_method': 'HMAC-SHA1',
    'oauth_token': process.env.TWT_ACCESS_TOKEN,
    'oauth_consumer_key': process.env.TWT_API_KEY,
    'oauth_timestamp': `${Math.floor(Date.now() / 1000)}`,
    'oauth_nonce': nonce()
});
const base = (method, url, param) => {
    return `${method.toUpperCase()}&${enc(url)}&${enc(param)}`;
};
const key = () => {
    return `${enc(process.env.TWT_API_SECRET)}&${enc(process.env.TWT_ACCESS_SECRET)}`;
};
const hmac = (base, key) => {
    return crypto.createHmac('sha1', key).update(base).digest('base64');
};
const sign = (method, url, params) => {
    return hmac(base(method, url, query(params)), key());
};
const auth = (method, url, params) => {
    let auth = oauth();
    params = { ...params, ...auth };
    let signature = sign(method, url, params);
    Object.assign(auth, { 'oauth_signature': signature });
    return `OAuth ${header(auth)}`;
};
export default auth;
