import { BASE_URL } from 'react-native-dotenv'
import axios from 'axios';

const instance = axios.create({
    baseURL: BASE_URL
});

instance.defaults.headers.post['Accept'] = 'application/json';
instance.defaults.headers.post['Content-Type'] = 'application/json';
instance.defaults.headers.common['Accept'] = 'application/json';
instance.defaults.headers.common['Content-Type'] = 'application/json';

export default instance;
