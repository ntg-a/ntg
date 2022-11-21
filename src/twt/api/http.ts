import request from '@/twt/request';
import tweet from '@/twt/tweet';



const defaults = {
    tweet_mode: 'extended',
    trim_user: true
}



const post = (status: string, thread?: string) => {
    return request('user', 'POST', 'statuses/update.json', {
        query: {
            in_reply_to_status_id: thread || undefined,
            ...defaults
        },
        body: {
            status: status || ''
        }
    }).then(tweet);
}



const destroy = (post: string) => {
    return request('user', 'POST', `statuses/destroy/${post}.json`, {
        query: {
            ...defaults
        }
    }).then(tweet);
}



const timeline = (config?: { min?: string, max?: string, count?: number }) => {
    return request('app', 'GET', 'statuses/user_timeline.json', {
        query: {
            user_id: process.env.TWT_USER_ID,
            count: config?.count || 200,
            since_id: config?.min,
            max_id: config?.max,
            ...defaults
        }
    }).then((res => {
        let t: any[] = res;
        return t?.map(tweet);
    }))
}



export default {
    timeline,
    destroy,
    post
}
