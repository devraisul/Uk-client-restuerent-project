  import axios from "axios";

  // Add menu
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
    await axios.get(`/api/menu/AllbuId/${id}`)
      .then(res => {
        addMenuResponse = res.data;
      })
      .catch(err => console.log(err));
    return addMenuResponse
  }

  // update menu
  export const editMenuSingle = async (data) => {
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
    console.log('From API-->',data);
    await axios.patch(`/api/menu/Updatemenu`, data, config)
      .then(res => {
        addMenuResponse = res;
      })
      .catch(err => console.log(err));
    return addMenuResponse
  }

  // update menu
  export const Editmenumultiple = async (data) => {
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
    await axios.patch(`/api/menu/Edit/multiple`, data, config)
      .then(res => {
        addMenuResponse = res;
      })
      .catch(err => console.log(err));
    return addMenuResponse
  }
  export const deleteMenu = async (id) => {
    const userInfo = localStorage.getItem('data')
    const jwt = JSON.parse(userInfo);
    const config = {
      headers: {
        "Content-Type": "application/json",
        'Accept': 'application/json',
        "Authorization": `Bearer ${jwt.token}`
      },
    };
  console.log(`/api/menu/${id}`);
    const result = await axios.delete(`/api/menu/${id}`, config)
      .then(res => {
        return res;
      })
      .catch(err => console.log(err));
    return result
  }
