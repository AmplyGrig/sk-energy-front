import axios from 'axios'

const instance = axios.create({
    baseURL: 'http://194.177.20.29:2112',
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
