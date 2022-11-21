import format, { Format } from '@/trm/format';
import { ansi, c } from '@/trm/ansi';



const error = (err: any) => {
    console.log(ansi(c.red, 'ERR', c.r), err || null);
}



const info = (...a: any) => {
    console.log(ansi(c.back.gray, c.bold, ' LOG ', c.r), ...a);
}



const data = (data: any) => {
    if (data && typeof data === 'object') {
        let formats = Object.values(format.state);
        let match = undefined as undefined | Format;
        const property = key => data.hasOwnProperty(key);
        for (let i = 0; i < formats.length; ++i) {
            let keys = formats[i].keys;
            let matched = match?.keys?.length;
            if (!matched || keys.length > matched) {
                if (keys.every(property)) {
                    match = formats[i];
                }
            }
        }

        if (match) {
            match.print(data);
            return;
        }
    }

    if (typeof data === 'function') {
        data = data.toString();
    }

    console.log(data || null);
}



export default {
    error,
    info,
    data
}
