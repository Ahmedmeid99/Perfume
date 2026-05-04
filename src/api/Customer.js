import { API_BASE } from "./Variables";
import axios from "axios";

const api = axios.create({
  baseURL: API_BASE
});

export const SignUpCustomer = async (data) => {
  try {
    const response = await api.post(`/customer`, data);
    return response.data;
  } catch (error) {
    console.error("Error signing up:", error);
    throw error;
  }
};

/**
 * Login using identifier (Username or Email) and password.
 * Backend expects { username, password }
 */
export const LoginCustomer = async (credentials) => {
  try {
    const response = await api.post(`/customer/login`, credentials);
    return response.data;
  } catch (error) {
    console.error("Error logging in:", error);
    throw error;
  }
};

export const UpdateCustomerInfo = async (id, data) => {
  try {
    const response = await api.put(`/customer/${id}`, data);
    return response.data;
  } catch (error) {
    console.error("Error updating customer info:", error);
    throw error;
  }
};

export const GetCustomerById = async (id) => {
  try {
    const response = await api.get(`/customer/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching customer:", error);
    throw error;
  }
};
