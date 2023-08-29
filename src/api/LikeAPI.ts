import config from "@/config/config";
import axios from "axios";

const createLikePost = async (id: number) => {
    axios.defaults.headers.common = { 'Authorization': `Bearer ${sessionStorage.getItem('token')}` }
    try {
        const result = await axios.post(`${config.domain}/posts/${id}/like`);
        return result.data;
    } catch (error: any) {
        return error.message;
    }
}

const createLikeComment = async (id: number) => {
    axios.defaults.headers.common = { 'Authorization': `Bearer ${sessionStorage.getItem('token')}` }
    try {
        const result = await axios.post(`${config.domain}/posts/${id}/comment/like`);
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
