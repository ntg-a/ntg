type Resolve<T> = T | Promise<T>;
type Function = (...a: any) => any;
type Param<T extends Function> = Parameters<T>;
type Return<T extends Function, R> = (...a: Param<T>) => R;
type Handle<T extends Function> = Return<T, Resolve<ReturnType<T>>>;



const event = <T extends Function>() => {
    const handler: { cb?: Handle<T> } = {};
    const handle = (cb: Handle<T>) => {
        handler.cb = cb;
    }

    const send = (...a: Param<T>) => {
        if (!handler.cb) return Promise.reject();
        return Promise.resolve(handler.cb(...a));
    }

    return {
        event: {
            handle
        },

        send
    }
}



export default event;
