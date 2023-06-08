import axios from "axios";
import Toast from "react-native-toast-message";
import AsyncStorage from "@react-native-async-storage/async-storage";

const http = axios.create();

http.interceptors.request.use(async (config) => {
    const token = await AsyncStorage.getItem("token");
    if (token) {
        config.headers["x-auth-token"] = token;
    }
    return config;
});

http.interceptors.response.use(null, (error) => {
    const expectedError = error.response && error.response.status >= 403;
    if (expectedError) {
        Toast.show({
            type: "error",
            position: "top",
            text1: "Error",
            text2: "An unexpected error occurred.",
            visibilityTime: 4000,
            autoHide: true,
            topOffset: 30,
            bottomOffset: 40,
        });
    }
    return Promise.reject(error);
});

export default {
    get: http.get,
    post: http.post,
    put: http.put,
    patch: http.patch,
    delete: http.delete,
};

// import axios from "axios";
// import Toast from "react-native-toast-message";
// import AsyncStorage from "@react-native-async-storage/async-storage";

// async function getToken() {
//     try {
//         const token = await AsyncStorage.getItem("token");
//         if (token !== null) {
//             console.log("🚀 ~ file: httpservices.js:28 ~ getToken ~ token:", token);
//             return token;
//         } else {
//             console.log("no token");
//             return null;
//         }
//     } catch (e) {
//         // error reading value
//         console.log(e);
//     }
// }

// axios.defaults.headers.common["x-auth-token"] = getToken();
// console.log("🚀 ~ file: httpService.js:22 ~ axios:", axios.defaults.headers.common["x-auth-token"]);

// axios.interceptors.response.use(null, (error) => {
//     const expectedError = error.response && error.response.status >= 403;
//     if (expectedError) {
//         Toast.show({
//             type: "error",
//             position: "top",
//             text1: "Error",
//             text2: "An unexpected error occurred.",
//             visibilityTime: 4000,
//             autoHide: true,
//             topOffset: 30,
//             bottomOffset: 40,
//         });
//     }
//     return Promise.reject(error);
// });

// export default {
//     get: axios.get,
//     post: axios.post,
//     put: axios.put,
//     patch: axios.patch,
//     delete: axios.delete,
// };
