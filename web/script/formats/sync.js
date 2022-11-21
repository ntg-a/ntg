import format, { template } from '/script/format.js';



const keys = [
    'trips',
    'count',
    'found'
]



const sync = taken => {
    let el = template('#sync');

    const set = (q, v) => {
        let e = el.querySelector(q);
        if (e) e.innerHTML = v;
    }

    let requests = taken.trips;
    let fetched = taken.count;
    let added = taken.found;

    set('.requests .num', requests);
    set('.fetched .num', fetched);
    set('.added .num', added);

    if (requests === 1) {
        set('.requests .num + span', 'Request');
    }

    return el;
}



format.add('sync', {
    el: sync,
    keys
})
