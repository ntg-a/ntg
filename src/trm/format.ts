import state from '@_/base/state';

type Format = {
    print: (arg: any) => void;
    keys: string[];
}

const format = state<Format>();

export type { Format };
export default format;
