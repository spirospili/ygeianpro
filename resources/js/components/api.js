
import axios from 'axios';
const instance = axios.create({
    // baseURL: 'http://ygeian.com/'
    baseUrl: 'http://www.ygeianpro.com/api/'
});
export default instance;
