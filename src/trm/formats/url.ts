import { ansi, c } from '@/trm/ansi';
import format from '@/trm/format';



const keys = [
    'url'
]



const url = (obj: any) => {
    let url: string = obj.url || 'null';

    let i = url.search(/[\?\#]/);
    if (i > 0) url = url.slice(0, i);
    let out = ansi(c.gray, url, c.r);

    console.log(out);
}



format.add('url', {
    print: url,
    keys
})
