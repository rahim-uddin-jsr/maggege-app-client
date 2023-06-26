import axios from "axios";

const sendUsersDataInBackend = (data) => {
  return axios.post("http://localhost:5000/users", data);
};

export default sendUsersDataInBackend;
