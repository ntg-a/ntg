import event from '@_/base/event';
import input from '@_/read/line';
import print from '@/trm/print';
import '@/trm/formats';



const prompt = '> ';



type Msg = (msg: string, cb: (a: any) => void) => any;

const _ = {
    ...event<Msg>(),
    trm: input(prompt)
}



const log = (arg: any) => {
    console.log();
    print.data(arg);
}



const send = (line: string) => {
    return _.send(line, log).then(res => {
        if (Array.isArray(res)) res.forEach(log);
        else if (res !== undefined) log(res);
    }).catch(err => {
        console.log();
        print.error(err);
    })
}



const init = () => {
    _.trm.listen(line => {
        send(line).finally(() => {
            console.log();
            _.trm.line();
        })
    })

}



export default {
    ..._.event,
    send,
    init,
    log
}
