import http from "./httpService";
import { apiUrl } from "../config.json";

const apiEndpoint = apiUrl + "/customer/signup";

export function register(user) {
  console.log(user);
  return http.post(apiEndpoint, {
    email: user.email,
    password: user.password,
    username: user.username,
    location: user.location,
  });
}

export default {
  register
};
