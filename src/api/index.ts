import axios from 'axios';

const API_URL = 'https://meinone.azurewebsites.net/v0/api';

const apiService = {
    getListOfSectors() {
        return axios.get(`${API_URL}/lookups/industries`, {
            params: {
                parentid: 10,
                nested: false,
            },
        });
    },
    setJobSeekerProfiles(data: object) {
        return axios.post(`${API_URL}/jobs/seekers/profiles/getProfiles`, data);
    },
    jobSeekerProfile(data: object) {
        return axios.post(`${API_URL}/jobs/seekers/profiles/getProfile`, data);
    },
};

export default apiService;
