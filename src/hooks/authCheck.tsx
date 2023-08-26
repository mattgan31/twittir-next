export const checkSession = () => {
    const token = sessionStorage.getItem('token');
    if (!token) {
        // Handle the error or redirection here
        throw new Error('User is not logged in.');
    }
};
