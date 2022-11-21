import cmd from '../../ntg/cmd.js';
cmd.add('head', cmd => {
    let pipe = cmd.pull();
    let nums = cmd.nums();
    let length = nums[0] || 1;
    let res = pipe.slice(-length);
    cmd.push(res);
    return res.length;
});
cmd.add('tail', cmd => {
    let pipe = cmd.pull();
    let nums = cmd.nums();
    let length = nums[0] || 1;
    let res = pipe.slice(0, length);
    cmd.push(res);
    return res.length;
});
cmd.add('body', cmd => {
    let pipe = cmd.pull();
    let nums = cmd.nums();
    let index = nums[0] || 1;
    let length = nums[1] || 1;
    let end = pipe.length - index + 1;
    if (end < 0)
        end = 0;
    if (length > end)
        length = end;
    let start = end - length;
    let res = pipe.slice(start, end);
    cmd.push(res);
    return res.length;
});
cmd.add('roll', cmd => {
    let pipe = cmd.pull();
    let nums = cmd.nums();
    let drain = pipe.slice();
    let count = nums[0] || 1;
    let res = [];
    for (let i = 0; i < count && pipe.length; ++i) {
        let j = Math.floor(Math.random() * drain.length);
        res.push(...drain.splice(j, 1));
    }
    cmd.push(res);
    return res.length;
});
