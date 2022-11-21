import html from 'html-entities';



type Tweet = {
    thread: string;
    text: string;
    time: string;
    id: string;
}



const text = (text?: string, urls?: any) => {
    if (urls && Array.isArray(urls)) {
        for (let i = 0; i < urls.length; ++i) {
            let src = urls?.[i]?.expanded_url;
            let url = urls?.[i]?.url;
            if (!src || !url) continue;
            text = text?.replace(url, src);
        }
    }

    let link = 'https://t.co/';
    let escape = 'https://t.co/ ';
    text = text?.replaceAll(link, escape);

    return html.decode(text, {
        scope: 'strict'
    })
}



const tweet = (res: any): Tweet => ({
    thread: res?.in_reply_to_status_id_str || undefined,
    text: text(res?.full_text || res?.text, res?.entities?.urls),
    time: res?.created_at,
    id: res?.id_str
})



export type { Tweet };
export default tweet;
