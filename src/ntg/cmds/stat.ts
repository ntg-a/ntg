import cmd from '@/ntg/cmd';



cmd.add('longest', cmd => {
    let pipe = cmd.pull();
    let nums = cmd.nums();
    let count = nums[0] || 1;

    let res = pipe.filter(twt => twt.text).sort((a, b) => {
        return a.text!.length - b.text!.length;
    }).slice(-count);

    cmd.push(res);
    return res.length;
})



cmd.add('shortest', cmd => {
    let pipe = cmd.pull();
    let nums = cmd.nums();
    let count = nums[0] || 1;

    let res = pipe.filter(twt => twt.text).sort((a, b) => {
        return b.text!.length - a.text!.length;
    }).slice(-count);

    cmd.push(res);
    return res.length;
})



cmd.add('count', cmd => {
    let pipe = cmd.pull();
    return pipe.length;
})
