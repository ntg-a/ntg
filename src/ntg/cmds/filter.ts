import cmd from '@/ntg/cmd';



cmd.add('find', cmd => {
    let pipe = cmd.pull();

    let res = pipe.filter(twt => {
        if (!twt.text) return false;
        if (!cmd.arg) return true;
        try {
            let reg = new RegExp(cmd.arg, 'si');
            return twt.text.search(reg) >= 0;
        }
        catch (err) {
            let text = twt.text.toLowerCase();
            let arg = cmd.arg.toLowerCase();
            return text.includes(arg);
        }
    })

    cmd.push(res);
    return res.length;
})



cmd.add('caps', cmd => {
    let pipe = cmd.pull();
    let args = cmd.args();
    let lock = args[0] === 'lock';

    let res = pipe.filter(twt => {
        let text = twt.text;
        if (!text) return false;
        if (lock) return text === text.toUpperCase();
        return text !== text.toLowerCase();
    })

    cmd.push(res);
    return res.length;
})



cmd.add('longer', cmd => {
    let pipe = cmd.pull();
    let nums = cmd.nums();
    let min = nums[0] || 140;

    let res = pipe.filter(twt => {
        if (!twt.text) return false;
        return twt.text.length >= min;
    })

    cmd.push(res);
    return res.length;
})



cmd.add('shorter', cmd => {
    let pipe = cmd.pull();
    let nums = cmd.nums();
    let max = nums[0] || 140;

    let res = pipe.filter(twt => {
        if (!twt.text) return false;
        return twt.text.length <= max;
    })

    cmd.push(res);
    return res.length;
})
