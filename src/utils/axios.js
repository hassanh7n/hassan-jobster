import axios from "axios";

const customFetch = axios.create({
    baseURL : 'https://hassan-jobster-backend-production.up.railway.app/api/v1',
});


export default customFetch;