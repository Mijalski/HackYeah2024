import axios from 'axios';

const defaultOptions = {};

function axiosProvider(baseUrl: string, options: any) {
    return axios.create({
        baseURL: baseUrl,
        ...defaultOptions,
        ...options
    });
}

export default axiosProvider;