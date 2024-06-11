//import axios from "axios";
import axios from "../util/apiClient";
import storage from "./storage";

const baseUrl = "/api/users";

const getConfit = () => ({
  headers: { Authorization: `Bearer ${storage.loadUser().token}` },
});

const getAll = async () => {
  const request = await axios.get(baseUrl);
  return request.data;
};

const update = async (id, newObject) => {
  const response = await axios.put(`${baseUrl}/${id}`, newObject, getConfit());
  return response.data;
};

const create = async (newObject) => {
  const response = await axios.post(baseUrl, newObject, getConfit());
  return response.data;
};

const remove = async (id) => {
  const response = await axios.delete(`${baseUrl}/${id}`, getConfit());
  return response.data;
};

export default { getAll, create, update, remove };
