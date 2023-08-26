import axios from "axios";
import config from "@/config/config";
const token = typeof window !== "undefined" && sessionStorage.getItem('token');

const getAllPosts = async () => {
    try {
        const result = await axios.get(`${config.domain}/posts`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return result.data;
    } catch (error) {
        return error.message;
    }
}

const createPost = async (payload) => {
    try {
        const result = await axios.post(`${config.domain}/posts`, payload, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return result.data;
    } catch (error) {
        return error.message;
    }
}

const getAllPostsByUserId = async (id) => {
    try {
        const result = await axios.get(`${config.domain}/posts/user/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return result.data;
    } catch (error) {
        return error.message;
    }
}

const showPost = async (id) => {

    try {
        const result = await axios.get(`${config.domain}/posts/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return result.data;
    } catch (error) {
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
