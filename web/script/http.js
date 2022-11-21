import emit from '/script/emit.js';



const api = location.host;

const _ = {
    ws: new WebSocket(`ws://${api}`),
    ...emit()
}

const socket = {
    ..._.event,
    open: () => {
        let state = _.ws.readyState;
        return state === _.ws.OPEN;
    }
}

_.ws.onopen = () => {
    _.emit('open');
}

_.ws.onclose = () => {
    _.emit('close');
}

_.ws.onmessage = e => {
    let res = e.data;

    if (!res) return;
    try { res = JSON.parse(res); }
    catch (err) {}

    _.emit('res', res);
}

_.event.on('res', res => {
    _.emit('msg', res);
})

_.event.on('cmd', cmd => {
    _.emit('msg', { cmd });
})

_.event.on('err', err => {
    _.emit('msg', { err });
})

_.event.on('close', () => {
    _.emit('msg', { err: 'Closed' });
})



const request = body => {
    let request = new Promise((resolve, reject) => {
        fetch(`http://${api}`, { method: 'POST', body }).then(res => {
            let ok = res.ok;
            res.text().then(res => {
                try { res = JSON.parse(res); }
                catch (err) { return reject(res); }
                if (!ok || !Array.isArray(res)) {
                    return reject(res);
                }

                res.reverse();
                resolve(res);
            }, reject);
        }, reject);
    })

    _.emit('cmd', body);
    request.catch(err => {
        _.emit('err', err);
    })

    return request;
}

const escape = input => {
    input = input?.replaceAll('|', '||');
    input = input?.replaceAll('&', '&&');
    return input || '';
}



export { socket, request, escape };
