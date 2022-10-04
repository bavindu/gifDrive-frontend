import axios from "axios";
import API_URL from "../constant/api";
import utilService from "../utils/util.service";

const getUser = async () => {
  const { email, token } = utilService.getToken();
  const url = API_URL + `/getUser/${email}`;
  const res = await axios.get(url, utilService.config(token));
  if (res) {
    console.log("user service", res);
    return res;
  }
};

const userService = {
  getUser,
};

export default userService;
