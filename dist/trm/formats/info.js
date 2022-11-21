import { ansi, c } from '../../trm/ansi.js';
import format from '../../trm/format.js';
import print from '../../trm/print.js';
const keys = [
    'cmd',
    'msg'
];
const info = (obj) => {
    let cmd = obj.cmd || 'null';
    let msg = obj.msg;
    let out = ansi(c.bold, cmd, c.r);
    if (!msg || typeof msg !== 'object') {
        print.info(out, msg);
    }
    else {
        print.info(out);
        print.data(msg);
    }
};
format.add('info', {
    print: info,
    keys
});
