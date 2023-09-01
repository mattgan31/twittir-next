import config from "@/config/config";
import axios from "axios";
import { getCookie } from "cookies-next";

const createComment = async (id: number, payload: any) => {
    axios.defaults.headers.common = { 'Authorization': `Bearer ${getCookie('token')}` }
    try {
        const result = await axios.post(`${config.domain}/posts/${id}/comment`, payload);
        return result.data;
    } catch (error: any) {
        return error.message;
    }
}

const commentAPI = {
    createComment
}

export default commentAPI;
