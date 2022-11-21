import fetch from '../_/http/client.js';
import enc from '../_/text/enc.js';
const api = 'https://api.twitter.com/oauth2/token';
const cred = () => {
    let cred = `${enc(process.env.TWT_API_KEY)}:${enc(process.env.TWT_API_SECRET)}`;
    return Buffer.from(cred).toString('base64');
};
const bearer = () => {
    return fetch(api, {
        method: 'POST',
        body: 'grant_type=client_credentials',
        headers: {
            'Authorization': `Basic ${cred()}`,
            'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
        }
    }).then(res => {
        if (res?.token_type !== 'bearer') {
            return Promise.reject(res);
        }
        return res?.access_token;
    });
};
const bear = () => {
    return `Bearer ${process.env.TWT_BEARER_TOKEN}`;
};
export { bearer };
export default bear;
