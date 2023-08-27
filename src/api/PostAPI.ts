import axios from "axios";
import config from "@/config/config";
const token = typeof window !== "undefined" && sessionStorage.getItem('token');

const getAllPosts = async () => {
    try {
        axios.defaults.headers.common = { 'Authorization': `Bearer ${sessionStorage.getItem('token')}` }
        const result = await axios.get(`${config.domain}/posts`);
        return result.data;
    } catch (error: any) {
        return error.message;
    }
}

const createPost = async (payload: any) => {
    try {
        axios.defaults.headers.common = { 'Authorization': `Bearer ${sessionStorage.getItem('token')}` }
        const result = await axios.post(`${config.domain}/posts`, payload);
        return result.data;
    } catch (error: any) {
        return error.message;
    }
}

const getAllPostsByUserId = async (id: number) => {
    try {
        axios.defaults.headers.common = { 'Authorization': `Bearer ${sessionStorage.getItem('token')}` }
        const result = await axios.get(`${config.domain}/posts/user/${id}`);
        return result.data;
    } catch (error: any) {
        return error.message;
    }
}

const showPost = async (id: number) => {
    try {
        axios.defaults.headers.common = { 'Authorization': `Bearer ${sessionStorage.getItem('token')}` }
        const result = await axios.get(`${config.domain}/posts/${id}`);
        return result.data;
    } catch (error: any) {
        return error.message;
    }
}

const PostAPI = {
    getAllPosts,
    createPost,
    showPost,
    getAllPostsByUserId
}

export default PostAPI;
