import format, { template } from '/script/format.js';



const keys = [
    'cmd'
]



const cmd = obj => {
    let el = template('#cmd');

    let cmd = obj.cmd || 'null';

    let name = el.querySelector('.name');
    if (name) name.innerHTML = cmd;

    return el;
}



format.add('cmd', {
    el: cmd,
    keys
})
