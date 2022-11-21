import emit from '/script/emit.js';



const _ = emit();



const init = () => {
    _.compose = document.querySelector('#compose');
    _.float = document.querySelector('#home > .main > .float');
    _.text = _.compose.querySelector('textarea');
    _.back = _.compose.querySelector('.i-back');
    _.post = _.compose.querySelector('.post');
    _.root = document.documentElement;

    _.float.onclick = open;
    _.back.onclick = close;

    _.text.oninput = () => {
        let empty = !_.text.value?.trim();
        if (empty) _.post.setAttribute('disabled', '');
        else _.post.removeAttribute('disabled');
    }

    _.post.onclick = () => {
        _.emit('post', get());
    }
}



const up = () => {
    return _.compose.classList.contains('open');
}



const open = () => {
    if (up()) return;

    enable();
    _.compose.classList.add('open');
    _.root.classList.add('static');

    setTimeout(() => {
        if (!up()) return;
        _.text.focus();
    }, 250);

    _.emit('open');
}



const close = () => {
    if (!up()) return;

    disable();
    _.compose.classList.remove('open');
    _.root.classList.remove('static');

    _.emit('close');
}



const enable = () => {
    _.text.removeAttribute('disabled');
    _.back.removeAttribute('disabled');
    _.text.oninput?.();
}



const disable = () => {
    _.post.setAttribute('disabled', '');
    _.text.setAttribute('disabled', '');
    _.back.setAttribute('disabled', '');
}



const get = () => {
    return _.text.value || '';
}



const set = val => {
    _.text.value = val || '';
}



export default {
    ..._.event,
    init,
    up,
    open,
    close,
    enable,
    disable,
    get,
    set
}
