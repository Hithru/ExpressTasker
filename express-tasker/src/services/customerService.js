import http from "./httpService";
import { apiUrl } from "../config.json";

const apiEndpoint = apiUrl + "/customer/signup";

export function register(user) {
  return http.post(apiEndpoint, {
    email: user.email,
    password: user.password,
    username: user.username,
  });
}

export default {
  register,
};
