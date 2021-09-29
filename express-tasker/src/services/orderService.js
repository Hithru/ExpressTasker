import http from "./httpService";
import { apiUrl } from "../config.json";

const apiEndpoint = apiUrl + "/order/customer";

export function getCustomerOrders(customer_id) {
  const body = { customer_id: customer_id };
  return http.post(apiEndpoint, body);
}
