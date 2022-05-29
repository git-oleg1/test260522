import axios from 'axios';

const baseUrl = 'https://dummyjson.com';

async function get(path, params) {
    return axios.get(`${baseUrl}/${path}`, {params});
}

export default {
    getPosts: async (skip = undefined, limit = undefined) => {
        return get(`posts`, {skip, limit});
    },
    getPost: async (id) => {
        return get(`posts/${id}`);
    },
    getUsers: async (skip = undefined, limit = undefined) => {
        return get(`users`, {skip, limit});
    }
};
