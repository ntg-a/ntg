const months = [
    'january',
    'february',
    'march',
    'april',
    'may',
    'june',
    'july',
    'august',
    'september',
    'october',
    'november',
    'december'
];
const parse = (arg) => {
    let args = arg.split(/\s+/, 3);
    let now = new Date();
    let month = now.getMonth();
    let year = now.getFullYear();
    let dec = year - year % 100;
    let day = 0;
    const num = (n) => {
        for (let i = 0; i < args.length; ++i) {
            let num = args[i] ? +args[i] : NaN;
            if (isNaN(num))
                continue;
            args.splice(i, 1);
            return num;
        }
        return n;
    };
    const mon = (m) => {
        let mon = months.map((_, i) => i);
        let arg = args[0]?.toLowerCase() || '';
        let match = mon.filter(i => months[i].startsWith(arg));
        if (match.length === 1)
            return match[0];
        return m;
    };
    let y = num(year);
    let m = mon(month);
    let d = num(day) || 1;
    if (y < 1000)
        y += dec;
    return new Date(y, m, d);
};
const date = (arg) => {
    return new Date(arg || NaN);
};
export { parse };
export default date;
