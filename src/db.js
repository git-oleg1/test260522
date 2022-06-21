import { Api } from '@/api/api';

function is_object(variable) {
    return typeof(variable) === 'object';
}

function is_array(variable) {
    return typeof(variable) === 'object' && variable instanceof Array;
}

function is_string(variable) {
    return typeof(variable) === 'string';
}

export class Db {
    #db

    constructor() {
        this.#db = null;
        Db.getInstance = () => this;
    }

    get isOpened() {
        return this.#db !== null;
    }

    open() {
        if (this.isOpened === true) {
            return this;
        }

        this.#db = openDatabase('mydb', '1.0', 'Test DB', 2 * 1024 * 1024, () => console.log('db created'));

        return this;
    }

    // create new sql query
    query() {
        return new Query(this);
    }

    exequteRawSql(rawSql, params = [], cbResult = undefined, cbError = undefined) {
        this.#db.transaction(function (tx) {
           tx.executeSql(rawSql, params, cbResult, cbError); 
        });
    }
}

Db.getInstance = () => new Db();

export class Query {
    #db
    #select
    #from
    #where
    #limit
    #skip
    #sort

    constructor(db) {
        this.#db = db;
        this.select();
    }

    from(table) {
        this.#from = new From(table);
        return this;
    }

    select(fields = '*') {
        this.#select = new Select(fields);
        return this;
    }

    where(where) {
        this.#where = new Where(where);
        return this;
    }

    sortBy(field, dir = 'ASC') {
        this.#sort = new Sort(field, dir);
        return this;
    }

    limit(limit, skip = 0) {
        this.#limit = parseInt(limit);
        this.#skip = parseInt(skip);
    }

    async get() {
        return new Promise((resolve, reject) => {
            this.#db.exequteRawSql(
                this.toSql(), [],
                (tx, result) => resolve(result),
                (tx, err) => reject(err)
            );
        });
    }

    toSql() {
        let sql = '';

        sql += `${this.#select} ${this.#from} `;

        if (this.#where) {
            sql += `${this.#where} `;
        }

        if (this.#sort) {
            sql += `${this.#sort} `;
        }

        if (this.#limit) {
            const skip = this.#skip || 0;
            sql += `LIMIT ${skip}, ${this.#limit} `;
        }

        return sql;
    }

    when(expr, cb) {
        if (expr) {
            cb.call(this, this);
        }
        return this;
    }
}

class Select {
    #fields

    constructor(fields) {
        this.#fields = fields
    }

    toString() {
        if (is_string(this.#fields)) {
            return `SELECT ${this.#fields} `;
        }

        if (is_array(this.#fields)) {
            const fields = this.#fields.join(', ');
            return `SELECT ${fields} `;
        }

        return `SELECT * `;
    }
}

class From {
    #table

    constructor(table = 'unknown_table') {
        this.#table = table
    }

    toString() {
        return `FROM ${this.#table} `;
    }
}

class Where {
    #where

    constructor(where = '') {
        this.#where = where;
    }

    toString() {
        return !this.#where ? '' : `WHERE ${this.#where} `;
    }
}

class Sort {
    #field
    #dir

    constructor(field, dir) {
        this.#field = field;
        this.#dir = dir;
    }

    toString() {
        return `ORDER BY ${this.#field} ${this.#dir} `;
    }
}

export const Utils = {
    initDb: async function () {
        const api = new Api('dummyjson');

        const promise = new Promise(async (resolve, reject) => {
            if (Utils.isInitialized) {
                return resolve();
            }
            console.log('Local DB: !Utils.isInitialized')
            try {
                console.log('Local DB: create tables');
                this.createTables();

                console.log('Local DB: fill table users');
                let response = await api.getUsers(undefined, 200);
                this.fillUsersTable(response.data.users);

                console.log('Local DB: fill table posts');
                response = await api.getPosts(null, 200);
                this.fillPostsTable(response.data.posts);

                Utils.isInitialized = true;
                
                resolve();
            } catch (e) {
                reject(e);
            }
        });
        
        return promise;
    },

    createTables() {
        const db = Db.getInstance().open();
        
        db.exequteRawSql(`CREATE TABLE IF NOT EXISTS posts (
            id INT NOT NULL UNIQUE,
            title varchar(255),
            body TEXT,
            user_id INT,
            published_at DATETIME,
            PRIMARY KEY (id)
        )`);

        db.exequteRawSql(`CREATE TABLE IF NOT EXISTS users (
            id INT NOT NULL UNIQUE,
            full_name varchar(64),
            email varchar(64),
            PRIMARY KEY (id)
        )`);

        db.exequteRawSql(`CREATE TABLE IF NOT EXISTS comments (
            id INT NOT NULL UNIQUE,
            post_id INT,
            user_id INT,
            body TEXT,
            published_at DATETIME,
            PRIMARY KEY (id)
        )`);
    },

    fillUsersTable(users) {
        const db = Db.getInstance().open();
        users.forEach((user) => {
            db.exequteRawSql(`INSERT INTO users VALUES(
                ${user.id}, '${user.firstName} ${user.lastName}',
                '${user.email}'
            )`);
        });
    },

    fillPostsTable(posts) {
        const db = Db.getInstance().open();
        posts.forEach((post) => {
            const published_at = '2022-01-01 00:00:00';
            db.exequteRawSql(
                `INSERT INTO posts (id, title, body, user_id, published_at) VALUES (?, ?, ?, ?, ?)`,
                [post.id, post.title, post.body, post.userId, published_at],
                undefined,
                undefined, // (tx, err) => console.log(err)
            );
        });
    },
};

Utils.isInitialized = false;
