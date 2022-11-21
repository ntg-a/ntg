const replace = {
    "!": '%21',
    "'": '%27',
    "(": '%28',
    ")": '%29',
    "*": '%2A'
}



const enc = (str?: any) => {
    if (typeof str !== 'string') {
        str = JSON.stringify(str);
    }

    let enc = '';
    let uri = encodeURIComponent(str);
    for (let i = 0; i < uri.length; ++i) {
        let rep = replace[uri[i]];
        enc += rep || uri[i];
    }

    return enc;
}



const field = (sep: string, quote: string) => (obj: any) => {
    let field = '';
    if (!obj) return field;
    let keys = Object.keys(obj);
    keys.sort((a, b) => a.localeCompare(b));

    for (let i = 0; i < keys.length; ++i) {
        let key = keys[i];
        let val = obj[key];
        if (val === null) continue;
        if (val === undefined) continue;

        field += enc(key);
        field += '=';
        field += quote;
        field += enc(val);
        field += quote;

        if (i !== keys.length - 1) {
            field += sep;
        }
    }

    return field;
}



const query = field('&', '');
const header = field(', ', '"');



export { query, header };
export default enc;
