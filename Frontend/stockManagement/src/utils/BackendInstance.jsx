import axios from "axios";
import jwtDecode from 'jwt-decode';


// const baseURL = "http://127.0.0.1:8000"
const baseURL = "https://invbackend.rabbitair.org"

// Instance
const BackendInstance = axios.create({
    baseURL: `${baseURL}/api`,
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json;charset=UTF-8',
    }
})


// To get new access token
async function refreshToken() {
    try {
        const response = await axios.post(`${baseURL}/token/refresh/`, {
            refresh: JSON.parse(localStorage.getItem('authToken')).refresh_token,
        });
        const authToken = JSON.parse(localStorage.getItem('authToken'))
        authToken['access_token'] = response.data.access

        localStorage.setItem('authToken', JSON.stringify(authToken));
        return (response.data.access);

    } catch (error) {
        localStorage.clear()
        return ('expired')
    }
}


// Checking if the token is expired or not 
BackendInstance.interceptors.request.use(
    async (config) => {
        const accessToken = localStorage.getItem('authToken') && JSON.parse(localStorage.getItem('authToken')).access_token;

        if (!accessToken) {
            // No access token found, return the config without setting the Authorization header
            return config;
        }

        // Check if the access token has expired
        const decodedToken = jwtDecode(accessToken);
        const currentTime = Date.now() / 1000;
        if (decodedToken.exp < currentTime) {
            // Access token has expired, refresh it
            const newAccessToken = await refreshToken();
            // setInterval(() => {
            config.headers.Authorization = `Bearer ${newAccessToken}`;
            // }, 5000);
            return config;
        }

        config.headers.Authorization = `Bearer ${accessToken}`;
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);


export default BackendInstance