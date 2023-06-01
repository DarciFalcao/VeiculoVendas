import axios from "axios" ;

const api = axios.create({
    baseURL: "http://Localhost:3333/"
})

export default api 