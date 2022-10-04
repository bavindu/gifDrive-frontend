import axios from "axios";
import API_URL from "../constant/api";
import TOKEN_KEY from "../constant/app";

const register = async (name, email, password) => {
  const res = await axios.post(API_URL + "/register", {
    name,
    email,
    password,
  });
  if (res) {
    return true;
  } else {
    return false;
  }
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
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.error(error);
    return false;
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
