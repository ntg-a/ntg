import emit from '/script/emit.js';



const _ = emit();



const icon = 'i-';

const name = tab => {
    return [...tab.classList].find(name => {
        return name.startsWith(icon);
    })?.slice(icon.length) || '';
}



const init = () => {
    _.footer = document.querySelector('#home > .footer');
    _.tabs = [..._.footer.children];

    _.tabs.forEach(tab => {
        let tag = name(tab);
        tab.onclick = () => {
            set(tag);
        }
    })
}



const get = () => {
    let tab = _.tabs.find(tab => {
        return tab.classList.contains('open');
    })

    if (!tab) return;
    return name(tab);
}



const set = (tag, mute) => {
    let tabbed = _.tabs.reduce((acc, cur) => {
        let tagged = !acc && name(cur) === tag;
        if (tagged) cur.classList.add('open');
        else cur.classList.remove('open');
        return acc || tagged;
    }, false);

    if (tabbed && !mute) {
        _.emit('tab', tag);
    }
}



export default {
    ..._.event,
    init,
    get,
    set
}
