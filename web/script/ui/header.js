import emit from '/script/emit.js';



const _ = emit();



const init = () => {
    _.header = document.querySelector('#home > .header');
    _.command = document.querySelector('#text-command');
    _.search = document.querySelector('#text-search');

    _.search.onkeyup = e => {
        if (e.key !== 'enter' && e.keyCode !== 13) {
            return;
        }

        _.search.blur();
        _.emit('search', query());
    }

    _.command.onkeyup = e => {
        if (e.key !== 'enter' && e.keyCode !== 13) {
            return;
        }

        _.command.blur();
        _.emit('command', command());
    }
}



const get = () => {
    return [..._.header.classList].find(name => {
        return name !== 'header';
    }) || '';
}



const set = (tag, mute) => {
    _.header.className = 'header ' + tag;
    if (!mute) _.emit('tab', tag);
}



const query = () => {
    return _.search.value || '';
}



const command = () => {
    return _.command.value || '';
}



export default {
    ..._.event,
    init,
    get,
    set,
    query,
    command
}
