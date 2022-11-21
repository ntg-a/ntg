import { ansi, c } from '../../trm/ansi.js';
import format from '../../trm/format.js';
const keys = [
    'url'
];
const url = (obj) => {
    let url = obj.url || 'null';
    let i = url.search(/[\?\#]/);
    if (i > 0)
        url = url.slice(0, i);
    let out = ansi(c.gray, url, c.r);
    console.log(out);
};
format.add('url', {
    print: url,
    keys
});
