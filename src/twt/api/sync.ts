import { read, write } from '@_/file/json';
import http from '@/twt/api/http';
import file from '@/twt/api/file';



const data = 'sync.json';



type Taken = {
    found?: number;
    count?: number;
    trips?: number;
    first?: string;
    last?: string;
}



const pull = (min?: string, max?: string) => {
    return new Promise<Taken>((resolve, reject) => {
        http.timeline({ min, max }).then(res => {
            Promise.all(res?.map(twt => {
                return file.post(twt);
            })).then(stored => {
                let first = res[0]?.id;
                let last = res[res.length - 1]?.id;
                let added = res?.filter((_, i) => !stored[i]);
                let count = stored.length;
                let found = added.length;

                let done = last === min || last === max;
                let taken = { found, count, first };
                if (!last || done) resolve({ ...taken });
                else resolve({ ...taken, last });
            }, reject);
        }, reject);
    })
}



const spin = (min?: string) => {
    return new Promise<Taken>((resolve, reject) => {
        const turn = (t: Taken, max?: string) => {
            pull(min, max).then(taken => {
                if (!t.first) t.first = taken?.first;
                if (taken?.last) t.last = taken.last;
                t.trips = (t.trips || 0) + (taken.trips || 1);
                t.count = (t.count || 0) + (taken.count || 0);
                t.found = (t.found || 0) + (taken.found || 0);
                if (!taken?.last) resolve(t);
                else turn(t, taken.last);
            }, reject);
        }

        turn({});
    })
}



const sync = () => {
    return new Promise<Taken>((resolve, reject) => {
        const hold = (t: any) => {
            spin(t.max).then(taken => {
                if (!t.min) t.min = taken.last;
                if (taken.first) t.max = taken.first;
                write(data, t).then(() => {
                    resolve(taken);
                }, reject);
            }, reject);
        }

        read(data, {}).then(hold, reject);
    })
}



export type { Taken };
export default sync;
