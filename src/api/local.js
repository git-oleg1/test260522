// использую для копирования json в базу
// затем работать только с базой вместо axios запросов - 'эмулировать api запросы'
import { Db, Utils } from '@/db';

function recordsetToArray(result) {
    const rows = [];
    for (let i = 0; i < result.rows.length; i++) {
        rows.push(result.rows.item(i));
    }
    return rows;
}

export default {
    getPosts: async (skip = undefined, limit = undefined, params = {}) => {
        return Utils.initDb().then(() => {
            const query = Db.getInstance().query();
            query
                .select('posts.*, users.full_name as author')
                .from('posts INNER JOIN users ON users.id = posts.user_id')
                .when(limit, q => q.limit(limit, skip))
                // any checks sql injection
                .when(params.author, q => q.where(`users.full_name like % ${params.author} %`))
                .when(params.sort, q => q.sortBy('title', params.sort))
                ;

            return query.get().then((result) => {
                return {posts: recordsetToArray(result)};
            });
        });
    },
    getPost: async (id) => {
        // return get(`posts/${id}`);
    },
    getUsers: async function (skip = undefined, limit = undefined) {
        return Utils.initDb().then(() => {
            const query = Db.getInstance().query();
            query.from('users');
            return 'ok';
        });
    },
};
