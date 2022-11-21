const esc = '\x1b';

const c = {
    r: 0,

    bold: 1,
    dim: 2,
    italic: 3,
    underline: 4,
    blinking: 5,
    inverse: 7,
    hidden: 8,
    strikethrough: 9,

    black: 30,
    red: 31,
    green: 32,
    yellow: 33,
    blue: 34,
    magenta: 35,
    cyan: 36,
    white: 37,

    gray: [38, 5, 244],

    back: {
        black: 40,
        red: 41,
        green: 42,
        yellow: 43,
        blue: 44,
        magenta: 45,
        cyan: 46,
        white: 47,

        gray: [48, 5, 244],
    }
}



const ansi = (...a: (number[] | number | string)[]) => {
    let codes: number[] = [];
    let args = a.flat();
    let out = '';

    const code = () => {
        if (!codes.length) return;
        out += `${esc}[${codes.join(';')}m`;
        codes = [];
    }

    for (let i = 0; i < args.length; ++i) {
        let arg = args[i];

        if (typeof arg === 'number') {
            codes.push(arg);
            continue;
        }

        code();
        if (arg) {
            out += arg;
        }
    }

    code();
    return out;
}



export { ansi, c };
