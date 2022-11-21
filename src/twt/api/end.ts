import http from '@/twt/api/http';
import file from '@/twt/api/file';
import { Tweet } from '@/twt';



const post = (status: string, thread?: string) => {
    return new Promise<Tweet>((resolve, reject) => {
        http.post(status, thread).then(res => {
            file.post(res).then(() => {
                resolve(res);
            }, reject);
        }, reject);
    })
}



const destroy = (post: string) => {
    return new Promise<Tweet>((resolve, reject) => {
        http.destroy(post).then(res => {
            file.destroy(res).then(() => {
                resolve(res);
            }, reject);
        }, reject);
    })
}



const timeline = () => {
    return file.timeline();
}



export default {
    timeline,
    destroy,
    post
}
