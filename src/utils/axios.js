import axios from "axios";

const customFetch = axios.create({
    baseURL : 'https://jobify-server.zeabur.app/api/v1',
});


export default customFetch;