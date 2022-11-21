import { Taken } from '@/twt/api/sync';
import { ansi, c } from '@/trm/ansi';
import format from '@/trm/format';



const keys = [
    'trips',
    'count',
    'found'
]



const num = (n?: number) => {
    return ansi(c.bold, `${n} `, c.r);
}

const sync = (taken: Taken) => {
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
}



format.add('sync', {
    print: sync,
    keys
})
