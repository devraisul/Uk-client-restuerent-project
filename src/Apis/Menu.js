import axios from "axios";

// Add Restaurent
export const addMenu = async (id, data) => {
    let addMenuResponse;
    const userInfo = localStorage.getItem('data')
    const jwt = JSON.parse(userInfo);
    const config = {
        headers: {
            "Content-Type": "application/json",
            'Accept': 'application/json',
            "Authorization": `Bearer ${jwt.token}`
        },
    };
    console.log(data);
    await axios.post(`/api/menu/multiple/${id}`, data, config)
        .then(res => {
            addMenuResponse = res;
        })
    return addMenuResponse
}

export const getMenu = async (id) => {
    let addMenuResponse;
    const userInfo = localStorage.getItem('data')
    const jwt = JSON.parse(userInfo);
    const config = {
        headers: {
            "Content-Type": "application/json",
            'Accept': 'application/json',
            "Authorization": `Bearer ${jwt.token}`
        },
    };
    await axios.get(`/api/menu/AllbuId/${id}`, config)
        .then(res => {
            addMenuResponse = res.data;
        })
        .catch(err => console.log(err));
    return addMenuResponse
}