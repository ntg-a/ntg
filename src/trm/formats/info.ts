import { ansi, c } from '@/trm/ansi';
import format from '@/trm/format';
import print from '@/trm/print';



const keys = [
    'cmd',
    'msg'
]



const info = (obj: any) => {
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
}



format.add('info', {
    print: info,
    keys
})
