const _ = {
    state: {},
    templates: {},
    add: (key, val) => {
        Object.assign(_.state, { [key]: val });
        return val;
    }
}



const template = q => {
    let template = _.templates[q] || document.querySelector(q);
    let element = template.content.firstElementChild;
    if (!_.templates[q]) _.templates[q] = template;
    return element.cloneNode(true);
}



const format = _.el = data => {
    if (data && typeof data === 'object') {
        let match = undefined;
        let formats = Object.values(_.state);
        const property = key => data.hasOwnProperty(key);
        for (let i = 0; i < formats.length; ++i) {
            let keys = formats[i].keys;
            let matched = match?.keys?.length;
            if (!matched || keys.length > matched) {
                if (keys.every(property)) {
                    match = formats[i];
                }
            }
        }

        if (match) {
            return match.el(data);
        }
    }

    if (typeof data === 'object') {
        data = JSON.stringify(data, null, 4);
    }

    let span = document.createElement('span');
    span.innerHTML = data;
    return span;
}



export { template, format };
export default _;
