import split from '@_/text/split';
import twt from '@/twt/api/end';
import { Tweet } from '@/twt';



const cut = 28;
const max = 280;
const sep = ' -';



const post = (status: string) => {
    return new Promise<Tweet[]>((resolve, reject) => {
        let post = split(status, { cut, max, sep });
        const thread: Tweet[] = [];

        const run = () => {
            let status = post.shift();
            if (!status) return reject();
            let reply = thread[thread.length - 1]?.id;
            twt.post(status, reply).then(res => {
                if (res) thread.push(res);
                if (post.length) run();
                else resolve(thread);
            }, reject);
        }

        run();
    })
}



const destroy = (post: string) => {
    return new Promise<Tweet[]>((resolve, reject) => {
        const thread: Tweet[] = [];

        const run = (post: string) => {
            if (!post) return reject();
            twt.destroy(post).then(res => {
                if (res) thread.unshift(res);
                if (res?.thread) run(res.thread);
                else resolve(thread);
            }, reject);
        }

        run(post);
    })
}



const timeline = () => {
    return twt.timeline().then((tweets: any) => {
        const threaded: Tweet[] = [];
        const thread: any = {};

        for (let i = 0; i < tweets.length; ++i) {
            let tweet = tweets[i];
            thread[tweet.id] = tweet;
            tweet.text ||= '';
        }

        for (let i = 0; i < tweets.length; ++i) {
            let tweet = tweets[i];
            if (!tweet.thread) continue;
            let chain = thread[tweet.thread];
            if (chain && !chain.reply) chain.reply = tweet;
            else delete tweet.thread;
        }

        for (let i = 0; i < tweets.length; ++i) {
            let tweet = tweets[i];
            if (tweet.thread) continue;

            let chain = tweet;
            while (chain = chain.reply) {
                tweet.id = chain.id;
                tweet.text += '\n\n';
                tweet.text += chain.text;
            }

            delete tweet.reply;
            threaded.push(tweet);
        }

        return threaded;
    })
}



export default {
    timeline,
    destroy,
    post
}
