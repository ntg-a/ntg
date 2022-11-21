import { ansi, c } from '@/trm/ansi';
import format from '@/trm/format';
import wrap from '@/trm/wrap';
import date from '@/trm/date';
import { Tweet } from '@/twt';



const keys = [
    'text',
    'time',
    'id'
]



const tweet = (twt: Partial<Tweet>) => {
    let line = '\u2015';
    let sep = ' \u00b7 ';
    let id = twt.id || '';
    let time = date(twt.time);
    let text = wrap(twt.text);

    if (!time || !id) sep = '';
    let width = process.stdout.columns;
    let len = id.length + sep.length + time.length;

    if (len > width) {
        id = id.slice(0, width);
        time = time.slice(0, width);
        len = time.length || id.length;
        if (sep) sep = '\n';
    }

    let out = '';

    for (let i = 0; i < text.length; ++i) {
        if (i) out += '\n';
        out += text[i];
    }

    if (out && (time || id)) {
        out += '\n';
        out += ansi(c.gray);
        out += line.repeat(len);
        out += ansi(c.r);
        out += '\n';
    }

    if (time) out += ansi(c.gray, time, c.r);
    if (time && id) out += ansi(c.bold, sep, c.r);
    if (id) out += ansi(c.gray, id, c.r);

    console.log(out);
}



format.add('tweet', {
    print: tweet,
    keys
})
