import plumb from '../ntg/plumb.js';
import command from '../ntg/cmd.js';
import twt from '../twt/index.js';
const run = (cmd, pipe) => {
    let fun = cmd && command.state[cmd.name];
    if (!cmd || !fun) {
        return Promise.reject(cmd?.name);
    }
    try {
        return Promise.resolve(fun(cmd));
    }
    catch (err) {
        if (!pipe || err !== pipe) {
            return Promise.reject(err);
        }
        return new Promise((resolve, reject) => {
            twt.timeline().then(res => {
                if (pipe)
                    pipe.in = res || [];
                run(cmd).then(resolve, reject);
            }, reject);
        });
    }
};
const process = (msg, cb) => {
    return new Promise((resolve, reject) => {
        const pipe = {};
        let cmd = plumb(msg, pipe);
        const relay = () => {
            run(cmd, pipe).then(res => {
                if (cmd?.flush) {
                    pipe.in = pipe.out;
                    delete pipe.out;
                    pipe.in ||= [];
                }
                if (cmd?.drain) {
                    delete pipe.in;
                }
                if (res !== undefined) {
                    if (cb)
                        cb({
                            cmd: cmd?.name,
                            msg: res
                        });
                }
                cmd = cmd?.pipe;
                if (cmd)
                    return relay();
                let out = pipe.out || [];
                delete pipe.out;
                delete pipe.in;
                resolve(out);
            }, reject);
        };
        relay();
    });
};
export default process;
