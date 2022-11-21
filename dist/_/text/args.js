const quotes = '\'\`\"';
const args = (input, config) => {
    let { raw = false, cut = false, count = NaN, } = config || {};
    count = Math.floor(count);
    if (count < 1)
        return [];
    let s = input?.trimStart() || '';
    let args = [];
    let quote = '';
    let word = '';
    for (let i = 0; i < s.length; ++i) {
        if (count && cut && count <= args.length)
            break;
        if (count && !cut && count <= args.length + 1) {
            if (word || s[i].trim())
                word += s[i];
            continue;
        }
        if (!raw && !quote && !word && quotes.includes(s[i])) {
            quote = s[i];
            continue;
        }
        if (quote && s[i] === quote) {
            args.push(word);
            quote = '';
            word = '';
            continue;
        }
        if (word && !quote && !s[i].trim()) {
            args.push(word);
            word = '';
            continue;
        }
        if (word || quote || s[i].trim()) {
            word += s[i];
            continue;
        }
    }
    if (word || quote)
        args.push(word);
    while (args.length < count)
        args.push('');
    if (count)
        args.splice(count);
    return args;
};
export default args;
