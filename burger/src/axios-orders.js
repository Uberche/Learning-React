import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://burger-demo-e0845.firebaseio.com/'
});

export default instance;