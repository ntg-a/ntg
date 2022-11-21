import split from '@_/text/split';



const wrap = (s?: string) => {
    return s?.split('\n').map(s => split(s, {
        max: process.stdout.columns
    })).flat() || [];
}



export default wrap;
