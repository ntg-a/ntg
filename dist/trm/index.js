import event from '../_/base/event.js';
import input from '../_/read/line.js';
import print from '../trm/print.js';
import '../trm/formats/index.js';
const prompt = '> ';
const _ = {
    ...event(),
    trm: input(prompt)
};
const log = (arg) => {
    console.log();
    print.data(arg);
};
const send = (line) => {
    return _.send(line, log).then(res => {
        if (Array.isArray(res))
            res.forEach(log);
        else if (res !== undefined)
            log(res);
    }).catch(err => {
        console.log();
        print.error(err);
    });
};
const init = () => {
    _.trm.listen(line => {
        send(line).finally(() => {
            console.log();
            _.trm.line();
        });
    });
};
export default {
    ..._.event,
    send,
    init,
    log
};
