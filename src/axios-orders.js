import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://react-learn-app.firebaseio.com/'
});

export default instance;