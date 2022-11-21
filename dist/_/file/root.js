import path from 'path';
import url from 'url';
const dirname = path.dirname(url.fileURLToPath(import.meta.url));
const root = path.resolve(dirname, '..', '..', '..');
const base = (dest) => {
    if (typeof dest === 'string')
        return path.resolve(root, dest);
    return path.resolve(root, ...dest);
};
const rebase = (...root) => {
    return (dest) => base(root.concat(dest));
};
export { base, rebase };
export default root;
