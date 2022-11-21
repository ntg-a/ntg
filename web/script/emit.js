const emit = () => {
    const _ = {};

    const add = (e, l) => {
        if (!_[e]) _[e] = [];
        _[e].push(l);
    }

    const once = (e, cb) => add(e, { cb, once: true });
    const on = (e, cb) => add(e, { cb });

    const emit = (e, ...a) => {
        _[e]?.forEach(l => l.cb(...a));
        _[e] = _[e]?.filter(l => !l.once);
    }

    return {
        event: {
            once,
            on
        },

        emit
    }
}



export default emit;
