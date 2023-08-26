import axios from "axios";
import config from "@/config/config";

const register = async (payload) => {
    try {
        const result = await axios.post(`${config.domain}/users/register`, payload);
        console.log();
        return result;
    } catch (error) {
        return error.message;
    }
}

const signin = async (payload) => {
    try {
        const result = await axios.post(`${config.domain}/login`, payload);
        return result;
    } catch (error) {
        return error.message;
    }
}

const profile = async () => {
    axios.defaults.headers.common = { 'Authorization': `Bearer ${sessionStorage.getItem('token')}` }
    try {
        const result = await axios.get(`${config.domain}/profile`);
        return result;
    } catch (error) {
        return error.message;
    }
}

const UserAPI = {
    register, signin, profile
}

export default UserAPI
