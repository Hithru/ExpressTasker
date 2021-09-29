import http from "./httpService";
import { apiUrl } from "../config.json";

const apiCreateEndpoint = apiUrl + "/review/createReview";

export function createReview(review) {
  console.log("data came service");

  return http.post(apiCreateEndpoint, {
    order_id: review.order_id,
    serviceProvider_id: review.serviceProvider_id,
    serviceProvider_name: review.serviceProvider_name,
    customer_name: review.customer_name,
    customer_id: review.customer_id,
    rating: review.rating,
    review: review.review,
  });
}

export default {
  createReview,
};
