import date, { parse } from '@_/text/date';
import cmd from '@/ntg/cmd';



cmd.add('since', cmd => {
    let pipe = cmd.pull();
    let min = parse(cmd.arg);
    let time = min.getTime();

    let res = pipe.filter(twt => {
        let d = date(twt.time);
        if (!d) return false;
        let t = d.getTime();
        return t >= time;
    })

    cmd.push(res);
    return res.length;
})



cmd.add('until', cmd => {
    let pipe = cmd.pull();
    let max = parse(cmd.arg);
    let time = max.getTime();

    let res = pipe.filter(twt => {
        let d = date(twt.time);
        let t = d.getTime();
        return t < time;
    })

    cmd.push(res);
    return res.length;
})



cmd.add('after', cmd => {
    let pipe = cmd.pull();
    let nums = cmd.nums();
    let hour = nums[0] || 12;

    let res = pipe.filter(twt => {
        let d = date(twt.time);
        let h = d.getHours();
        return h >= hour;
    })

    cmd.push(res);
    return res.length;
})



cmd.add('before', cmd => {
    let pipe = cmd.pull();
    let nums = cmd.nums();
    let hour = nums[0] || 12;

    let res = pipe.filter(twt => {
        let d = date(twt.time);
        let h = d.getHours();
        return h < hour;
    })

    cmd.push(res);
    return res.length;
})
