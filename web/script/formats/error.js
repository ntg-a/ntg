import format, { template } from '/script/format.js';



const keys = [
    'err'
]



const error = obj => {
    let el = template('#error');

    let err = obj.err || 'null';

    el.append(format.el(err));

    return el;
}



format.add('error', {
    el: error,
    keys
})
