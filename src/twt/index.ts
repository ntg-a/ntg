import { bearer } from './bear';
import { Tweet } from './tweet';
import api from './api';

export type { Tweet };
export default {
    ...api,
    bearer
}
