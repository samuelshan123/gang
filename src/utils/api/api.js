import axios from 'axios';
import { API_URL } from '../constants/constants';

const BASE_URL = API_URL;

export const fetchData = async (endPoint) => {
  try {
    const response = await axios.get(`${BASE_URL}/${endPoint}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const postData = async (endPoint,data) => {
  try {
    const response = await axios.post(`${BASE_URL}/${endPoint}`,data);
    return response.data;
  } catch (error) {
    throw error;
  }
};
