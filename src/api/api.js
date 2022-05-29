import dummyjson from './dummyjson';
// использую для копирования json в базу
// затем работать только с базой вместо axios запросов - 'эмулировать api запросы'
import { Db, Utils } from '@/db';
import local from './local';

const apis = {
    dummyjson,
    local
};

export class Api {
    #implementation

    constructor(api = 'dummyjson') {
        this.#implementation = apis[api];
    }

    async getPosts() {
        return this.#implementation.getPosts(...arguments);
    }

    async getPost(id) {
        return this.#implementation.getPost(...arguments);
    }

    async getUsers() {
        return this.#implementation.getUsers(...arguments);
    }
}
