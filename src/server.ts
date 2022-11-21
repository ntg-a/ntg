import ntg from '@/ntg';
import trm from '@/trm';
import web from '@/web';

trm.handle(ntg.process);
web.handle(ntg.process);

if (process.argv.length > 2) {
    let args = process.argv.slice(2);
    let arg = args.join(' ');
    trm.send(arg);
}
else {
    trm.init();
    web.init();
}
