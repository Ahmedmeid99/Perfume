import apiClient from "./apiClient";

export const SignUpCustomer = async (data) => {
  try {
    const response = await apiClient.post(`/register`, data);
    return response;
  } catch (error) {
    console.error("Error signing up:", error);
    throw error;
  }
};

/**
 * Login using identifier (Username or Email) and password.
 * Backend expects { Email, Password } but our login service maps it to both.
 */
export const LoginCustomer = async (credentials) => {
  try {
    // Map UserName to Email as expected by .NET LoginDto
    const payload = {
      Email: credentials.UserName,
      Password: credentials.Password
    };
    const response = await apiClient.post(`/login`, payload);
    return response;
  } catch (error) {
    console.error("Error logging in:", error);
    throw error;
  }
};

export const UpdateCustomerInfo = async (id, data) => {
  try {
    const response = await apiClient.put(`/Users/${id}`, data);
    return response;
  } catch (error) {
    console.error("Error updating customer info:", error);
    throw error;
  }
};

export const GetCustomerById = async (id) => {
  try {
    const response = await apiClient.get(`/Users/${id}`);
    return response;
  } catch (error) {
    console.error("Error fetching customer:", error);
    throw error;
  }
};

export const ChangeCustomerPassword = async (data) => {
  try {
    const response = await apiClient.post(`/Users/change-password`, data);
    return response;
  } catch (error) {
    console.error("Error changing password:", error);
    throw error;
  }
};

