export const checkSession = () => {
    axios.defaults.headers.common = { 'Authorization': `Bearer ${getCookie('token')}` }
    if (!token) {
        // Handle the error or redirection here
        throw new Error('User is not logged in.');
    }
};
