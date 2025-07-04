import axios from 'axios';
import { BASE_URL } from "../../utils/url";
import { getUserFromStorage } from '../../utils/getUserFromStorage';


const token = getUserFromStorage();
//!Add
export const addTransactionAPI = async ({ type, category, date, description, amount }) => {
  const response = await axios.post(`${BASE_URL}/transactions/create`, {
    category,
    date,
    description,
    amount,
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
export const listTransactionsAPI = async ({category, type, startDate, endDate}) => {
  const response = await axios.get(`${BASE_URL}/transactions/lists`,{
    params: { category, endDate, startDate, type },

    headers: {
      Authorization: `bearer ${token}`,
    },

  }); 
    
  
  return response.data;
};


