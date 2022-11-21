import parse, { Command } from '@/ntg/parse';
import { Tweet } from '@/twt';



const flush = '|';
const split = '&';



type Flow = Partial<Tweet>[];

type Line = {
    in?: Flow;
    out?: Flow;
}

type Cmd = Command & {
    push: (tweets?: Tweet | Readonly<Flow>) => void;
    pull: () => Readonly<Flow>;
}

type Pipe = Cmd & {
    flush: boolean;
    drain: boolean;
    pipe?: Pipe;
}



const place = (cmd: string, sep: string, line: Line) => {
    const pipe = parse(cmd) as Pipe;

    const push = (list: any[], item: any | any[]) => {
        if (Array.isArray(item)) list.push(...item);
        else list.push(item);
        return list;
    }

    pipe.push = tweets => {
        if (!line.out) line.out = [];
        if (tweets) push(line.out, tweets);
    }
    
    pipe.pull = () => {
        if (!line.in) throw line;
        return line.in;
    }

    pipe.flush = sep === flush;
    pipe.drain = !sep;

    return pipe;
}



const plumb = (msg: string, line: Line) => {
    const seps = `[\\${flush}\\${split}]`;
    const head = {} as Pipe;
    let pipe = head;

    for (let cmd = '';;) {
        let i = msg.search(seps);
        if (i < 0) i = msg.length;
        let dub = msg[i] === msg[i + 1];
        let cut = i < msg.length;
        let esc = cut && dub;
        let sep = msg[i];

        let j = esc ? i + 1 : i;
        cmd += msg.slice(0, j);
        msg = msg.slice(j + 1);
        if (esc) continue;

        pipe.pipe = place(cmd, sep, line);
        pipe = pipe.pipe;
        if (!cut) break;
        else cmd = '';
    }

    return head.pipe;
}



export type { Cmd, Pipe, Line };
export default plumb;
