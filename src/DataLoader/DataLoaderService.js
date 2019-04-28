import axios from 'axios';

const load = (URL, setErrors) => {
    try {
        return axios.get(URL).then(response => {
            return response.data;
        });
    } catch (error) {
        console.error('Error while loading URL: ', URL, error);
        setErrors(error.message);
    }
}

export default { load };