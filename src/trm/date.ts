const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

const invalid = 'Invalid Date';



const num = (i: number) => {
    return i < 10 ? `0${i}` : `${i}`;
}

const date = (time?: any) => {
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

    return `${day}, ${date} ${month} ${year}, ${hour}:${min}:${sec}`;
}



export default date;
