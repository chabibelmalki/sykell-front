
import axios from 'axios';


export const post = async (endpoint, data, cancelToken) => {
    const url = process.env.REACT_APP_BACKEND_URL;
    const token = process.env.REACT_APP_API_TOKEN;

    try {
        const response = await axios.post(`${url}/${endpoint}`, data, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            cancelToken: cancelToken,
        });
        return response.data;
    } catch (error) {
        // error
        if (axios.isCancel(error)) {
            return Promise.reject(new Error('Request canceled'));
        } else if (error.response) {
            //  HTTP error (erreur 4xx ou 5xx)
            if (error.response.status === 404) {
                return Promise.reject(new Error('Endpoint not found'));
            } else {
                return Promise.reject(new Error(error.response.data));
            }
        } else if (error.request) {
            // no response from server
            return Promise.reject(new Error('No response from server'));
        } else {
            return Promise.reject(error);
        }
    }
};

