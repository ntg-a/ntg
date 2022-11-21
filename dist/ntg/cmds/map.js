import cmd from '../../ntg/cmd.js';
cmd.add('pick', cmd => {
    let pipe = cmd.pull();
    let args = cmd.args();
    let res = pipe.map(twt => {
        return Object.keys(twt).reduce((val, key) => {
            if (!args.includes(key))
                val[key] = null;
            else
                val[key] = twt[key];
            return val;
        }, {});
    });
    cmd.push(res);
    return args.join(' ');
});
cmd.add('peek', cmd => {
    let pipe = cmd.pull();
    let nums = cmd.nums();
    let length = nums[0] || 10;
    let res = pipe.map(twt => {
        let text = twt.text?.slice(0, length);
        return { ...twt, text };
    });
    cmd.push(res);
    return length;
});
cmd.add('reverse', cmd => {
    let pipe = cmd.pull();
    let drain = pipe.slice();
    let res = drain.reverse();
    cmd.push(res);
    return res.length;
});
