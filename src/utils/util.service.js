import TOKEN_KEY from "../constant/app";

const config = (token) => {
  return { headers: { Authorization: `Bearer ${token}` } };
};

const getToken = () => {
  const lsObj = localStorage.getItem(TOKEN_KEY);
  console.log(lsObj);
  return JSON.parse(localStorage.getItem(TOKEN_KEY));
};

const utilService = {
  config,
  getToken,
};

export default utilService;
