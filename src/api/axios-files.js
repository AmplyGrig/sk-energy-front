import axios from 'axios'

const instance = axios.create({
    baseURL: 'http://185.22.63.196:2112',
    headers: {
        'Authorization': {
            toString() {
                return `Bearer ${localStorage.getItem('token')}`
            }
        },
        'Content-Type': 'multipart/form-data',
    },
});

export default instance
