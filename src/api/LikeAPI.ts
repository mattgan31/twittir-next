import config from "@/config/config";
import axios from "axios";
import { getCookie } from "cookies-next";

const createLikePost = async (id: number) => {
    axios.defaults.headers.common = { 'Authorization': `Bearer ${getCookie('token')}` }
    try {
        const result = await axios.post(`${config.domain}/posts/${id}/like`);
        return result.data;
    } catch (error: any) {
        return error.message;
    }
}

const createLikeComment = async (id: number) => {
    axios.defaults.headers.common = { 'Authorization': `Bearer ${getCookie('token')}` }
    try {
        const result = await axios.post(`${config.domain}/comments/${id}/like`);
        return result.data;
    } catch (error: any) {
        return error.message;
    }
}


const commentAPI = {
    createLikePost,
    createLikeComment
}

export default commentAPI;
