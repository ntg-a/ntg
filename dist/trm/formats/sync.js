import { ansi, c } from '../../trm/ansi.js';
import format from '../../trm/format.js';
const keys = [
    'trips',
    'count',
    'found'
];
const num = (n) => {
    return ansi(c.bold, `${n} `, c.r);
};
const sync = (taken) => {
    let requests = taken.trips;
    let fetched = taken.count;
    let added = taken.found;
    let out = '';
    out += num(requests);
    out += ansi(c.yellow, 'request');
    out += requests === 1 ? '' : 's';
    out += ansi(c.r);
    out += '\n';
    out += num(fetched);
    out += ansi(c.blue, 'fetched', c.r);
    out += '\n';
    out += num(added);
    out += ansi(c.green, 'added', c.r);
    console.log(out);
};
format.add('sync', {
    print: sync,
    keys
});
