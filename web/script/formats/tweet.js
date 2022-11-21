import format, { template } from '/script/format.js';
import config from '/script/ui/config.js';
import date from '/script/date.js';
import copy from '/script/copy.js';



const delay = 1000;

const keys = [
    'text',
    'time',
    'id'
]



const tweet = twt => {
    let el = template('#tweet');

    const set = (q, v) => {
        let e = el.querySelector(q);
        if (e && v) e.innerHTML = v;
        else if (!v) e?.remove();
    }

    let text = config.get('text') && twt?.text;
    let id = config.get('id') && twt?.id;
    let time = date(twt?.time);

    set('.text', text);
    set('.time', time);
    set('.id', id);

    if (!time || !id) set('.sep');
    if (!time && !id) set('.top');

    let label = config.get('labels') && '0';
    set('.reply .value', label);
    set('.retweet .value', label);
    set('.like .value', label);
    set('.share .value', '');

    if (!config.get('options')) set('.i-options');
    if (!config.get('avatar')) set('.avatar');
    if (!config.get('icons')) set('.bot');

    if (text) {
        let hold = undefined;

        const down = () => {
            hold = setTimeout(() => {
                hold = undefined;
                copy(text);
            }, delay);
        }

        const up = () => {
            clearTimeout(hold);
            hold = undefined;
        }

        el.onpointerdown = down;
        el.onpointercancel = up;
        el.onpointerout = up;
        el.onpointerup = up;
    }

    return el;
}



format.add('tweet', {
    el: tweet,
    keys
})
