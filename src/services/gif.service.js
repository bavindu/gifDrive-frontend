import axios from "axios";
import API_URL from "../constant/api";
import utilService from "../utils/util.service";

const uploadGif = async (gif, onUploadProgress) => {
  const { email, token } = utilService.getToken();
  const url = API_URL + `/gifUpload/${email}`;
  const file = new FormData();
  file.append("file", gif);
  const config = {
    headers: { Authorization: `Bearer ${token}` },
    onUploadProgress: onUploadProgress,
  };
  return axios.post(url, file, config);
};

const updateGif = async (payload) => {
  const { token } = utilService.getToken();
  const url = API_URL + "/updateGif";
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };
  return axios.post(url, payload, config);
};

const deleteGif = async (payload) => {
  const { token } = utilService.getToken();
  const url = API_URL + "/deleteGif";
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };
  return axios.post(url, payload, config);
};

const getGifByPublicUrl = async (publicUrl) => {
  const { token } = utilService.getToken();
  const url = API_URL + `/getGifPublicUrl/${publicUrl}`;
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };
  return axios.get(url, config);
};

const gifService = {
  uploadGif,
  updateGif,
  deleteGif,
  getGifByPublicUrl,
};

export default gifService;
