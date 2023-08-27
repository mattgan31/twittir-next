import config from "@/config/config";
import axios from "axios";

const createComment = async (id: number, payload: any) => {
    axios.defaults.headers.common = { 'Authorization': `Bearer ${sessionStorage.getItem('token')}` }
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
