import axios from "axios";

axios.interceptors.response.use(null, (error) => {
    console.log("🚀 ~ file: httpService.js:4 ~ axios.interceptors.response.use ~ error:", error);
    const expectedError = error.response && error.response.status >= 403;
    if (expectedError) alert("An unexpected error occurrred.");
    return Promise.reject(error);
});

export default {
    get: axios.get,
    post: axios.post,
    put: axios.put,
    patch: axios.patch,
    delete: axios.delete,
};
