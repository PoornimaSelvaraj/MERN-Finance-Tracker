import axios from 'axios';
import { BASE_URL } from "../../utils/url";
import { getUserFromStorage } from '../../utils/getUserFromStorage';


const token = getUserFromStorage();
//!Add
export const addCategoryAPI = async ({ name, type }) => {
  const response = await axios.post(`${BASE_URL}/categories/create`, {
    name,
    type,
  },{
    headers: {
      Authorization: `bearer ${token}`,
    }

  });
  return response.data;
};

//!update
export const updateCategoryAPI = async ({ name, type, id }) => {
  const response = await axios.put(`${BASE_URL}/categories/update/${id}`, {
    name,
    type,
    
  },{
    headers: {
      Authorization: `bearer ${token}`,
    }

  });
  return response.data;

};

//!Delete

export const deleteCategoryAPI = async (id) => {
  const response = await axios.delete(`${BASE_URL}/categories/delete/${id}`, 
    {

    headers: {
      Authorization: `bearer ${token}`,
    }

  });
  return response.data;

};



//!list
export const listCategoriesAPI = async () => {
  const response = await axios.get(`${BASE_URL}/categories/lists`,{
    headers: {
      Authorization: `bearer ${token}`,
    },

  }); 
    
  
  return response.data;
};


