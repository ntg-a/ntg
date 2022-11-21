type Config = {
    max: number;
    cut?: number;
    sep?: string;
}



const split = (input: string, config: Config) => {

    let {
        sep = '',
        cut = NaN,
        max = 100,
    } = config || {};

    max = Math.floor(max || 0);
    if (max < 1) return [''];

    cut = Math.floor(cut);
    if (cut < 0) cut = 0;

    let sm = sep.length - max + 1;
    if (sm > 0) sep = sep.slice(sm);



    let s = input?.trim() || '';
    let o: string[] = [];

    for (;;) {
        if (s.length <= max) {
            if (s || !o.length) {
                o.push(s);
            }

            break;
        }

        let m = max - sep.length;
        let f = s.slice(0, m + 1);
        let w = f.match(/\S*$/);

        let i = w?.index || m;
        let c = w?.[0]?.length || 0;
        if (c > cut) i = m;

        let l = s.slice(0, i).trim();
        if (l) o.push(l + sep);
        s = s.slice(i).trim();
    }

    return o;
}



export default split;
