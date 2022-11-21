import split from '../_/text/split.js';
const wrap = (s) => {
    return s?.split('\n').map(s => split(s, {
        max: process.stdout.columns
    })).flat() || [];
};
export default wrap;
