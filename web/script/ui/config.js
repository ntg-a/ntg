import emit from '/script/emit.js';



const _ = emit();



const check = 'check-';

const name = input => {
    let id = input.id || '';
    if (!id.startsWith(check)) return id;
    return id.slice(check.length);
}



const init = () => {
    _.home = document.querySelector('#home');
    _.config = document.querySelector('#config');
    _.stars = document.querySelector('#home > .header .i-stars');
    _.input = [..._.config.querySelectorAll('input')];

    _.stars.onclick = open;

    _.input.forEach(input => {
        let tag = name(input);
        input.onchange = () => {
            _.emit('set', tag);
        }
    })
}



const up = () => {
    return _.config.classList.contains('open');
}



const open = () => {
    if (up()) return;

    _.config.classList.add('open');

    setTimeout(() => {
        if (!up()) return;
        _.restore = _.home.onclick;
        _.home.onclick = close;
    }, 250);

    _.emit('open');
}



const close = () => {
    if (!up()) return;

    _.config.classList.remove('open');

    if (_.hasOwnProperty('restore')) {
        _.home.onclick = _.restore;
        delete _.restore;
    }

    _.emit('close');
}



const get = tag => {
    let input = _.input.find(el => {
        return name(el) === tag;
    })

    if (!input) return;
    return !!input.checked;
}



const set = (tag, val) => {
    let input = _.input.find(el => {
        return name(el) === tag;
    })

    if (!input) return;
    input.checked = !!val;
}



export default {
    ..._.event,
    init,
    up,
    open,
    close,
    get,
    set
}
