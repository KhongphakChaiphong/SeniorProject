import axios from 'axios';
const instance = axios.create();

// https://jsonplaceholder.typicode.com/users
instance.defaults.baseURL = 'https://medical-express.herokuapp.com';

instance.defaults.headers = {
    "Content-Type": "application/json",
}

export default {
    showList() {
        return instance.get('/api/user/all');
    },
    showPostDetail(){
        return instance.get('/api/post/all')
    }

}


