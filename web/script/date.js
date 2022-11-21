import config from '/script/ui/config.js';



const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

const invalid = 'Invalid Date';



const num = i => {
    return i < 10 ? `0${i}` : `${i}`;
}

const date = time => {
    if (!time) return '';
    let parse = Date.parse(time);
    if (isNaN(parse)) return invalid;
    let t = new Date(parse);

    let hour = num(t.getHours());
    let min = num(t.getMinutes());
    let sec = num(t.getSeconds());

    let day = days[t.getDay()];
    let date = num(t.getDate());
    let month = months[t.getMonth()];
    let year = num(t.getFullYear() % 100);

    let out = [];

    if (config.get('day')) {
        out.push(`${day}`);
    }

    if (config.get('date')) {
        out.push(`${date} ${month} ${year}`);
    }

    if (config.get('time')) {
        out.push(`${hour}:${min}:${sec}`);
    }

    return out.join(', ');
}



export default date;
