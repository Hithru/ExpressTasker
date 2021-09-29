import http from "./httpService";
import { apiUrl } from "../config.json";

const apiCreateEndpoint = apiUrl + "/rating/createRating";

export function createRating(rating) {
  console.log("data came service");
  console.log(rating);

  return http.post(apiCreateEndpoint, {
    order_id: rating.order_id,
    serviceProvider_id: rating.serviceProvider_id,
    serviceProvider_name: rating.serviceProvider_name,
    customer_name: rating.customer_name,
    customer_id: rating.customer_id,
    rating: rating.rating,
  });
}

export default {
  createRating,
};
