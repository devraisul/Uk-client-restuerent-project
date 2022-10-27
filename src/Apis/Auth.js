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
  console.log('from api',data);
  let loginResponse;
  // const config = {
  //   headers: {
  //     'Content-Type': 'application/json',
  //   },
  // };
  await axios.post(`/api/owner`, data)
    .then(res => {
      console.log('response',res);
      loginResponse = res.data;
      window.localStorage.setItem('user', JSON.stringify(loginResponse.data.user));
      window.localStorage.setItem('token', JSON.stringify(loginResponse.token));
    })
  return loginResponse
}

// changePassword

export const changePass = async (data) => {
  let changePassResponse;
  const userInfo = localStorage.getItem('data')
  const jwt = JSON.parse(userInfo);
  const config = {
    headers: {
      "Content-Type": "application/json",
      'Accept': 'application/json',
      "Authorization": `Bearer ${jwt.token}`
    },
  };
  await axios.patch(`/api/forgetpassword/changepassword`,data, config)
    .then(res => {
      
      changePassResponse = res;
    })
  return changePassResponse
}

// forgotPassword

export const forgotPass = async (data) => {
  let forgotPassResponse;
  await axios.post(`/api/forgetpassword`, data)
  .then((res) => {
    forgotPassResponse = res;
  });
  return forgotPassResponse
}

// update password after forgot password

export const updatePassAPI = async (token,data) => {
  let updatePassResponse;
  await axios
    .patch(`/api/forgetpassword/reset/${token}`, data)
    .then((res) => {
      updatePassResponse = res;
    });
  return updatePassResponse
}






export const customerRegister = async (data) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  console.log('from api req',data);
  const resData = await axios.post(`/api/owner/user/registration`, data, config)
    .then(res => {
      console.log('from api res',res.data);
      return res.data;
    }).catch(err=>{
      console.log('API_ERROR : ',err);
    })
  return resData;
}