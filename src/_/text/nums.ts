type Config = {
    count?: number;
    cut?: boolean;
    raw?: boolean;
}



const nums = (input: string, config?: Config) => {

    let {
        raw = false,
        cut = false,
        count = NaN,
    } = config || {};

    count = Math.floor(count);
    if (count < 1) return [];



    let args = input?.split(/\s+/) || '';
    let nums: number[] = [];

    for (let i = 0; i < args.length; ++i) {
        let full = nums.length >= count;
        if (full && cut) break;

        let num = args[i] ? +args[i] : NaN;
        if (!raw && isNaN(num)) continue;

        if (!raw) {
            num = Math.abs(num);
            num = Math.floor(num);
        }

        if (!full) nums.push(num);
        else nums[nums.length - 1] += num;
    }

    while (count && nums.length < count) {
        nums.push(raw ? NaN : 0);
    }

    return nums;
}



export default nums;
