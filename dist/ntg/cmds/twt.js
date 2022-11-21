import cmd from '../../ntg/cmd.js';
import twt from '../../twt/index.js';
cmd.add('twt', cmd => {
    let status = cmd.arg;
    return twt.post(status).then(res => {
        let count = res.length;
        cmd.push(res);
        return count;
    });
});
cmd.add('delete', cmd => {
    let args = cmd.args();
    let id = args[0];
    if (id === 'piped') {
        let pipe = cmd.pull();
        if (pipe.length === 1) {
            id = pipe[0].id || '';
        }
    }
    if (!/^\d+$/.test(id)) {
        return Promise.reject(id);
    }
    return twt.destroy(id).then(res => {
        let count = res.length;
        cmd.push(res);
        return count;
    });
});
cmd.add('sync', () => {
    return twt.sync();
});
cmd.add('bearer', () => {
    return twt.bearer();
});
cmd.add('userid', () => {
    let access = process.env.TWT_ACCESS_TOKEN;
    let i = access?.indexOf('-') || -1;
    if (!i || i <= 0)
        return null;
    return access.slice(0, i);
});
