import format, { template } from '/script/format.js';



const keys = [
    'cmd',
    'msg'
]



const info = obj => {
    let el = template('#info');

    let cmd = obj.cmd || 'null';
    let msg = obj.msg;

    let name = el.querySelector('.name');
    if (name) name.innerHTML = cmd;
    el.append(format.el(msg));

    return el;
}



format.add('info', {
    el: info,
    keys
})
