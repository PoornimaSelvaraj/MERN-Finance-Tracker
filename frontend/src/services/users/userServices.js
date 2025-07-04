import axios from 'axios';
import { BASE_URL } from "../../utils/url";

import { getUserFromStorage } from '../../utils/getUserFromStorage';




const token = getUserFromStorage();

//!Login
export const loginAPI = async ({ email, password }) => {
  const response = await axios.post(`${BASE_URL}/users/login`, {
    email,
    password,
  });
  return response.data;
};


//!register
export const registerAPI = async ({ email, password, username }) => {

  const response = await axios.post(`${BASE_URL}/users/register`, {
    email,
    password,
    username,
  });
  return response.data;
};


//!change password
export const changePasswordAPI = async (newPassword) => {
  const response = await axios.put(`${BASE_URL}/users/change-password`,
  {
    
    newPassword,
  },
  {
    headers: {
      Authorization: `bearer ${token}`,
    }
  }

   
);
  return response.data;
};

//!update profile
export const updateProfileAPI = async ({ email, username }) => {

  const response = await axios.put(`${BASE_URL}/users/update-profile`, {
    email,
    username,
  },
  {
    headers: {
      Authorization: `bearer ${token}`,
    }
  }
);
  return response.data;
};
