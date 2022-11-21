import { Cmd } from '@/ntg/process';
import state from '@_/base/state';

type Fun = (cmd: Cmd) => any;

const cmd = state<Fun>();

export type { Fun };
export default cmd;
