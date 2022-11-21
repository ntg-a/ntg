const event = () => {
    const handler = {};
    const handle = (cb) => {
        handler.cb = cb;
    };
    const send = (...a) => {
        if (!handler.cb)
            return Promise.reject();
        return Promise.resolve(handler.cb(...a));
    };
    return {
        event: {
            handle
        },
        send
    };
};
export default event;
