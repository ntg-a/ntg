import { socket, request, escape } from '/script/http.js';



const frame = 100;
const history = 1000;

const _ = {
    home: [],
    search: [],
    notifications: []
}

socket.on('msg', msg => {
    _.notifications.unshift(msg);
    if (_.notifications.length > history) {
        _.notifications.splice(history);
    }
})



const body = i => `body ${i + 1} ${frame}`;



const home = fresh => {
    if (fresh) {
        _.home.splice(0);
    }

    return i => {
        if (i < _.home.length) return _.home.slice(i);
        return request(body(i)).then(res => {
            if (i === _.home.length) {
                _.home.push(...res);
            }

            return res;
        })
    }
}



const search = (query, fresh) => {
    if (fresh) {
        _.search.splice(0);
        delete _.found;
    }

    if (!query?.trim()) return;
    let search = `find ${escape(query)}`;

    return i => {
        if (_.found || i < _.search.length) return _.search.slice(i);
        return request(`${search} | ${body(i)}`).then(res => {
            if (i === _.search.length) {
                _.search.push(...res);

                if (res.length < frame) {
                    _.found = true;
                }

                if (!i && !res.length) {
                    return ['No results'];
                }
            }

            return res;
        })
    }
}



const notifications = () => {
    return i => {
        if (i) return;
        return _.notifications.slice();
    }
}



const messages = command => {
    if (!command?.trim()) return;

    return i => {
        if (i) return;
        return request(command);
    }
}



export default {
    home,
    search,
    notifications,
    messages
}
