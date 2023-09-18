import axios from "axios";
import config from "@/config/config";
import { getCookie } from "cookies-next";
const token = typeof window !== "undefined" && getCookie('token');

const getAllPosts = async () => {
    try {
        axios.defaults.headers.common = { 'Authorization': `Bearer ${getCookie('token')}` }
        const result = await axios.get(`${config.domain}/posts`);
        return result.data;
    } catch (error: any) {
        return error.message;
    }
}

const createPost = async (payload: any) => {
    try {
        axios.defaults.headers.common = { 'Authorization': `Bearer ${getCookie('token')}` }
        const result = await axios.post(`${config.domain}/posts`, payload);
        return result.data;
    } catch (error: any) {
        return error.message;
    }
}

const getAllPostsByUserId = async (id: number) => {
    try {
        axios.defaults.headers.common = { 'Authorization': `Bearer ${getCookie('token')}` }
        const result = await axios.get(`${config.domain}/posts/user/${id}`);
        return result.data;
    } catch (error: any) {
        return error.message;
    }
}

const showPost = async (id: number) => {
    try {
        axios.defaults.headers.common = { 'Authorization': `Bearer ${getCookie('token')}` }
        const result = await axios.get(`${config.domain}/posts/${id}`);
        return result.data;
    } catch (error: any) {
        return error.message;
    }
}

const deletePost = async (id: number) => {
    try {
        axios.defaults.headers.common = { 'Authorization': `Bearer ${getCookie('token')}` }
        const result = await axios.delete(`${config.domain}/posts/${id}`);
        return result.data;
    } catch (error: any) {
        return error.message;
    }
}

const PostAPI = {
    getAllPosts,
    createPost,
    showPost,
    getAllPostsByUserId,
    deletePost
}

export default PostAPI;
