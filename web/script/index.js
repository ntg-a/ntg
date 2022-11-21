import { socket, request, escape } from '/script/http.js';
import compose from '/script/ui/compose.js';
import config from '/script/ui/config.js';
import footer from '/script/ui/footer.js';
import header from '/script/ui/header.js';
import main from '/script/ui/main.js';
import tab from '/script/tab.js';



window.onload = () => {
    compose.init();
    config.init();
    footer.init();
    header.init();
    main.init();
    setup();
    event();

    if (socket.open()) init();
    else socket.once('open', init);
}



const setup = () => {
    config.set('text', 1);

    config.set('day', 1);
    config.set('date', 1);
    config.set('time', 1);
    config.set('id', 0);

    config.set('icons', 1);
    config.set('labels', 0);
    config.set('avatar', 1);
    config.set('options', 1);
}



const event = () => {
    const restore = tag => {
        if (tag === 'home') main.put(tab.home());
        if (tag === 'search') main.put(tab.search(header.query()));
        if (tag === 'notifications') main.put(tab.notifications());
        if (tag === 'messages') main.put(tab.messages());
    }

    footer.on('tab', tag => {
        if (header.get() !== tag) {
            header.set(tag);
        }
    })

    header.on('tab', tag => {
        restore(tag);
    })

    config.on('set', () => {
        restore(header.get());
    })

    header.on('search', text => {
        main.put(tab.search(text, true));
    })

    header.on('command', text => {
        main.push(tab.messages(text));
    })



    socket.on('msg', msg => {
        let tag = header.get();
        if (tag === 'notifications') main.prepend(msg);
        if (tag === 'messages') main.append(msg);
    })



    compose.on('post', text => {
        let twt = `twt ${escape(text)}`;

        compose.disable();
        request(twt).then(() => {
            footer.set('home', true);
            header.set('home', true);
            main.put(tab.home(true));
            compose.close();
            compose.set('');
        }, compose.enable);
    })



    let state = search => {
        if (history.popped) {
            delete history.popped;
            return;
        }

        let url = '/?' + search;
        history.pushState(null, '', url);
    }

    header.on('tab', tag => {
        state(tag);
    })

    config.on('open', () => {
        state('config');
    })

    config.on('close', () => {
        if (!header.get()) {
            footer.set('home');
        }

        state(header.get());
    })

    compose.on('open', () => {
        state('compose');
    })

    compose.on('close', () => {
        if (!header.get()) {
            footer.set('home');
        }

        state(header.get());
    })

    window.onpopstate = () => {
        history.popped = true;
        init();
    }
}



const init = () => {
    let tags = [
        'home',
        'search',
        'notifications',
        'messages',
        'compose',
        'config'
    ]

    let tag = window.location.search?.slice(1);
    if (!tags.includes(tag)) tag = tags[0];

    if (tag === 'config') {
        config.open();
        return;
    }

    if (tag === 'compose') {
        compose.open();
        return;
    }

    footer.set(tag);

    if (config.up()) {
        config.close();
    }

    if (compose.up()) {
        compose.close();
    }
}
