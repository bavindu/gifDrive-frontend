import axios from "axios";
import API_URL from "../constant/api";
import TOKEN_KEY from "../constant/app";

const register = async (name, email, password) => {
  return axios.post(API_URL + "/register", {
    name,
    email,
    password,
  });
};

const authenticate = async (email, password) => {
  try {
    const res = await axios.post(API_URL + "/authenticate", {
      email,
      password,
    });
    if (res && res.data && res.data.email && res.data.token) {
      console.log(res);
      localStorage.setItem(TOKEN_KEY, JSON.stringify(res.data));
      return { data: res.data };
    } else {
      return { error: "Login Error" };
    }
  } catch (error) {
    console.error(error);
    return {
      error: error?.response?.data ? error?.response?.data : "Login Error",
    };
  }
};

const logOut = () => {
  localStorage.removeItem(TOKEN_KEY);
};

const authService = {
  register,
  authenticate,
  logOut,
};

export default authService;
