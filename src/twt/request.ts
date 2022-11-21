import { query } from '@_/text/enc';
import fetch from '@_/http/client';
import auth from '@/twt/auth';
import bear from '@/twt/bear';



type Params = {
    headers?: {
        [key: string]: any;
    },
    query?: {
        [key: string]: any;
    },
    body?: {
        [key: string]: any;
    }
}

type Auth = 'user' | 'app' | '';

const api = 'https://api.twitter.com/1.1';

const defaults = {

}



const request = (type: Auth, method: string, url: string, config?: Params) => {
    if (!url.startsWith('https://') && !url.startsWith('http://')) {
        if (!url.startsWith('/')) url = '/' + url;
        url = api + url;
    }

    let headers = { ...defaults };

    if (config?.body) Object.assign(headers, {
        'Content-Type': 'application/x-www-form-urlencoded'
    })

    if (type === 'user') Object.assign(headers, {
        'Authorization': auth(method, url, {
            ...config?.query,
            ...config?.body
        })
    })

    if (type === 'app') Object.assign(headers, {
        'Authorization': bear()
    })

    if (config?.headers) Object.assign(headers, {
        ...config.headers
    })

    return fetch(url, {
        body: query(config?.body),
        query: config?.query,
        headers,
        method
    })
}



export default request;
