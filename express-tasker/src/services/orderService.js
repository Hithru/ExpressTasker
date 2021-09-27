import http from "./httpService";
import { apiUrl } from "../config.json";

const apiEndpoint = apiUrl + "/order/customer";

export function getCustomerOrders(customer_id) {
  const body = { customer_id: customer_id };
  return http.post(apiEndpoint, body);
}

const apiServiceEndpoint = apiUrl + "/order/serviceProvider";

export function getServiceProviderOrders(serviceProvider_id) {
  console.log(serviceProvider_id);
  const service_body = { serviceProvider_id: serviceProvider_id };
  return http.post(apiServiceEndpoint, service_body);
}

const apiCancelOrderEndpoint = apiUrl + "/order/cancel";

export function cancelOrder(order_id) {
  console.log(order_id);
  const cancel_body = { order_id: order_id };
  return http.post(apiCancelOrderEndpoint, cancel_body);
}

const apiAcceptOrderEndpoint = apiUrl + "/order/accept";

export function acceptOrder(order_id) {
  console.log(order_id);
  const accept_body = { order_id: order_id };
  return http.post(apiAcceptOrderEndpoint, accept_body);
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
  getServiceProviderOrders,
  createOrder,
  acceptOrder,
  cancelOrder,
};
