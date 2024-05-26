import * as api from '../utils/api'

const API_PATH = 'api/urlinfo'

export const processUrlAnalyzer = async (data, cancelToken) => {
    return await api.post(`${API_PATH}`, data, cancelToken);
};