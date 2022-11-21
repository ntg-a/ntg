import cmd from '../../ntg/cmd.js';
import web from '../../web/index.js';
cmd.add('clients', () => {
    return web.api.clients.length;
});
cmd.add('help', command => {
    let args = command.args();
    let fun = args[0];
    if (!fun)
        return Object.keys(cmd.state);
    let c = cmd.state[fun]?.toString() || 'undefined;';
    return `\nconst ${fun} = ${c}`;
});
cmd.add('echo', cmd => {
    return cmd.arg;
});
cmd.add('c', () => {
    process.exit();
});
