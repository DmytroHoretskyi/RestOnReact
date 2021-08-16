import axios from 'axios';

const BASE_URL = 'https://jsonplaceholder.typicode.com';

export const fetchData = {
    getAllUsers() {
        return axios.get(`${BASE_URL}/users`);
    },
    getPosts(id) {
        return axios.get(`${BASE_URL}/posts?userId=${id}`);
    },
    getPostInfo(id) {
        return axios.get(`${BASE_URL}/posts/${id}`);
    },
    updatePost(post) {
        return axios.put(`${BASE_URL}/posts/${post.id}`, post);
    },
    deletePost(id) {
        return axios.delete(`${BASE_URL}/posts/${id}`);
    },
    addNewPost(post) {
        return axios.post(`${BASE_URL}/posts`, post);
    },
    getComments(id) {
        return axios.get(`${BASE_URL}/comments?postId=${id}`);
    }
};
