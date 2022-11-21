const util = (name, arg) => {
    const cmd = { name, arg };
    cmd.args = () => {
        return cmd.arg.split(/\s+/);
    };
    cmd.nums = () => {
        return cmd.arg.split(/\s+/).map(arg => {
            return Math.floor(Math.abs(arg ? +arg : NaN));
        }).filter(n => !isNaN(n));
    };
    return cmd;
};
const parse = (cmd) => {
    cmd = cmd?.trim() || '';
    let white = cmd.match(/\s+/);
    let space = white?.[0]?.length || 0;
    let name = cmd.slice(0, white?.index).toLowerCase();
    let arg = cmd.slice(name.length + space);
    return util(name, arg);
};
export default parse;
