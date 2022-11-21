import path from 'path';
import url from 'url';



const dirname = path.dirname(url.fileURLToPath(import.meta.url));
const root = path.resolve(dirname, '..', '..', '..');

type Path = string | string[];



const base = (dest: Path) => {
    if (typeof dest === 'string') return path.resolve(root, dest);
    return path.resolve(root, ...dest);
}



const rebase = (...root: string[]) => {
    return (dest: Path) => base(root.concat(dest));
}



export type { Path };
export { base, rebase };
export default root;
