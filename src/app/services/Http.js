import Constants from 'expo-constants';
import axios from 'axios';

const baseURL = Constants.manifest.extra.baseurl;
const instance = axios.create({
    baseURL
});

export const defineAccessToken = (token) => {
    instance.defaults.headers.post['Authorization'] = `${token.token_type} ${token.access_token}`;
    instance.defaults.headers.common['Authorization'] = `${token.token_type} ${token.access_token}`;
};

instance.defaults.headers.post['Accept'] = 'application/json';
instance.defaults.headers.post['Content-Type'] = 'application/json';
instance.defaults.headers.common['Accept'] = 'application/json';
instance.defaults.headers.common['Content-Type'] = 'application/json';

export default instance;
