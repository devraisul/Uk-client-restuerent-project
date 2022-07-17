import axios from "axios";

// Add Restaurent
export const addRestaurent = async (data) => {
    let addRestaurentResponse;
    const token = JSON.parse(localStorage.token)
    const config = {
        headers: {
            "Content-Type": "application/json",
            'Accept': 'application/json',
            "Authorization": `Bearer ${token}`
        },
    };
    await axios.post(`/api/restaurant/`, data, config)
        .then(res => {
            addRestaurentResponse = res;
        })
    return addRestaurentResponse
}