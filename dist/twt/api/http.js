import request from '../../twt/request.js';
import tweet from '../../twt/tweet.js';
const defaults = {
    tweet_mode: 'extended',
    trim_user: true
};
const post = (status, thread) => {
    return request('user', 'POST', 'statuses/update.json', {
        query: {
            in_reply_to_status_id: thread || undefined,
            ...defaults
        },
        body: {
            status: status || ''
        }
    }).then(tweet);
};
const destroy = (post) => {
    return request('user', 'POST', `statuses/destroy/${post}.json`, {
        query: {
            ...defaults
        }
    }).then(tweet);
};
const timeline = (config) => {
    return request('app', 'GET', 'statuses/user_timeline.json', {
        query: {
            user_id: process.env.TWT_USER_ID,
            count: config?.count || 200,
            since_id: config?.min,
            max_id: config?.max,
            ...defaults
        }
    }).then((res => {
        let t = res;
        return t?.map(tweet);
    }));
};
export default {
    timeline,
    destroy,
    post
};
