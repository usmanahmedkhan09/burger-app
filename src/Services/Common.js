import axios from "axios";

const instance = axios.create({
    baseURL: 'https://hot-spicy-burger-default-rtdb.firebaseio.com/',
    timeout: 1000,
    timeoutErrorMessage: 'Network Error'
})


export default instance
