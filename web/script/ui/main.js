import { format } from '/script/format.js';
import '/script/formats/index.js';



const space = 100;
const frame = 10;

const _ = {};



const init = () => {
    _.timeline = document.querySelector('#home > .main > .timeline');
    _.content = _.timeline.querySelector('.content');
}



const prepend = data => _.content.prepend(format(data));
const append = data => _.content.append(format(data));



const push = cb => {
    _.timeline.onscroll = undefined;
    if (!cb) return;

    let items = [];
    let index = 0;

    const shift = () => {
        if (!items) return;
        let shift = items.splice(0, frame);
        index += shift.length;
        return shift;
    }

    const load = () => {
        if (!items) return;
        if (!items.length) {
            items = undefined;
            let get = cb(index);
            return Promise.resolve(get).then(res => {
                if (res?.length) items = res;
                else items = undefined;
                return shift();
            }, () => {
                items = undefined;
            })
        }

        let res = shift();
        return Promise.resolve(res);
    }

    const scroll = () => {
        if (!items) return;
        let top = _.timeline.scrollTop;
        let height = _.timeline.clientHeight;
        let length = _.content.clientHeight;
        let bot = length - height - top;
        if (bot > space) return;

        load()?.then(res => {
            if (!res?.length) return;
            if (_.timeline.onscroll !== scroll) return;

            let top = _.timeline.scrollTop;
            _.content.append(...res.map(format));
            if (top !== _.timeline.scrollTop) {
                _.timeline.scrollTop = top;
            }

            scroll();
        })
    }

    let height = _.content.clientHeight - 1;
    if (height > 0) _.timeline.scrollTop = height;
    _.timeline.onscroll = scroll;
    scroll();
}

const put = cb => {
    _.content.innerHTML = '';
    push(cb);
}



export default {
    init,
    prepend,
    append,
    push,
    put
}
