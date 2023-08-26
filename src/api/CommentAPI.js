import config from "@/config/config";
import axios from "axios";

const createComment = async (id, payload) => {
    const token = sessionStorage.getItem('token');
    try {
        const result = await axios.post(`${config.domain}/posts/${id}/comment`, payload, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return result.data;
    } catch (error) {
        return error.message;
    }
}

const commentAPI = {
    createComment
}

export default commentAPI;
