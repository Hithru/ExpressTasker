import http from "./httpService";
import { apiUrl } from "../config.json";

const apiEndpoint = apiUrl + "/order/customer";

export function getCustomerOrders(customer_id) {
  const body = { customer_id: customer_id };
  return http.post(apiEndpoint, body);
}

const apiCreateEndpoint = apiUrl + "/order/createOrder";
export function createOrder(order) {
  console.log(order.amount);
  console.log("data came service");
  console.log(order);

  return http.post(apiCreateEndpoint, {
    serviceProvider_id: order.serviceProvider_id,
    serviceProvider_name: order.serviceProvider_name,
    customer_name: order.customer_name,
    customer_id: order.customer_id,
    amount: order.amount,
    status: order.status,
    startTime: order.startTime,
  });
}

export default {
  getCustomerOrders,
  createOrder,
};
