import axios from "axios";
import config from "@/config/config";
import { getCookie } from "cookies-next";

const register = async (payload: any) => {
    try {
        const result = await axios.post(`${config.domain}/register`, payload);
        return result;
    } catch (error: any) {
        return error.message;
    }
}

const signin = async (payload: any) => {
    try {
        const result = await axios.post(`${config.domain}/login`, payload);
        return result;
    } catch (error: any) {
        return error.message;
    }
}

const profile = async () => {
    axios.defaults.headers.common = { 'Authorization': `Bearer ${getCookie('token')}` }
    try {
        const result = await axios.get(`${config.domain}/users/profile`);
        return result;
    } catch (error: any) {
        return error.message;
    }
}

const searchUsers = async (payload: any) => {
    axios.defaults.headers.common = { 'Authorization': `Bearer ${getCookie('token')}` }
    try {
        const result = await axios.get(`${config.domain}/search?username=${payload.username}`);
        return result;
    } catch (error: any) {
        return error.message;
    }
}

const getUserById = async (payload: any) => {
    axios.defaults.headers.common = { 'Authorization': `Bearer ${getCookie('token')}` }
    try {
        const result = await axios.get(`${config.domain}/users/${payload.userId}`);
        return result;
    } catch (error: any) {
        return error.message;
    }
}

const UserAPI = {
    register, signin, profile, searchUsers, getUserById
}

export default UserAPI
