import http from "./httpService";
import { apiUrl } from "../config.json";

const apiEndpoint = apiUrl + "/order/customer";

// function movieUrl(id) {
//   return `${apiEndpoint}/${id}`;
// }

// export function getMovies() {
//   return http.get(apiEndpoint);
// }

export function getCustomerOrders(customer_id) {
  const body = { customer_id: customer_id };
  return http.post(apiEndpoint, body);
}

// export function getMovie(movieId) {
//   return http.get(movieUrl(movieId));
// }

// export function saveMovie(movie) {
//   if (movie._id) {
//     const body = { ...movie };
//     delete body._id;
//     return http.put(movieUrl(movie._id), body);
//   }

//   return http.post(apiEndpoint, movie);
// }

// export function deleteMovie(movieId) {
//   return http.delete(movieUrl(movieId));
// }
