import http from '../../twt/api/http.js';
import file from '../../twt/api/file.js';
const post = (status, thread) => {
    return new Promise((resolve, reject) => {
        http.post(status, thread).then(res => {
            file.post(res).then(() => {
                resolve(res);
            }, reject);
        }, reject);
    });
};
const destroy = (post) => {
    return new Promise((resolve, reject) => {
        http.destroy(post).then(res => {
            file.destroy(res).then(() => {
                resolve(res);
            }, reject);
        }, reject);
    });
};
const timeline = () => {
    return file.timeline();
};
export default {
    timeline,
    destroy,
    post
};
