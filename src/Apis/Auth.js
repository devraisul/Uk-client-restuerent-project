import axios from "axios";


// login response
export const userLogin = async (data) => {
    let loginResponse
    await axios.post(`/api/auth`, data)
        .then(res => {
            loginResponse = res.data;
            window.localStorage.setItem('data', JSON.stringify(loginResponse));
        })
    return loginResponse
}

// login response
export const userRegister = async (data) => {
    let loginResponse;
    const config = {
        headers: {
            'Content-Type': 'application/json',
        },
    };
    await axios.post(`/api/owner`, data, config)
        .then(res => {
            loginResponse = res.data;
            window.localStorage.setItem('user', JSON.stringify(loginResponse.data.user));
            window.localStorage.setItem('token', JSON.stringify(loginResponse.token));
        })
    return loginResponse
}