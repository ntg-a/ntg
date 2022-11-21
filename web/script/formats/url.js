import format, { template } from '/script/format.js';



const keys = [
    'url'
]



const url = obj => {
    let el = template('#url');

    let url = obj.url || 'null';
    let i = url.search(/[\?\#]/);
    if (i > 0) url = url.slice(0, i);

    el.innerHTML = url;

    return el;
}



format.add('url', {
    el: url,
    keys
})
