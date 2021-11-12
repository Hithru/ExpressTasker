import React, { Component } from "react";
import auth from "../../services/customerAuth";
import {
  getServiceProviderOrders,
  cancelOrder,
  acceptOrder,
} from "../../services/orderService";
import Pagination from "../common/pagination";
import { paginate } from "../../utils/paginate";
import classes from "./serviceProviderOrderTable.module.css";
import "./serviceProviderOrderTable.module.css";

export default class ServiceProviderOrderTable extends Component {
  constructor(props) {
    super(props);

    this.state = {
      orders: [],
      user: "",
      currentPage: 1,
      pageSize: 3,
    };
  }

  async componentDidMount() {
    const user = auth.getCurrentUser();

    const ordersArray = await getServiceProviderOrders(user._id);
    const orders = ordersArray.data;
    this.setState({ user, orders });
  }

  handlePageChange = (page) => {
    this.setState({ currentPage: page });
  };

  async handleAccept(order_id) {
    const order = await acceptOrder(order_id);
    window.location = "/service-provider-orders";
  }

  async handleCancel(order_id) {
    const order = await cancelOrder(order_id);
    window.location = "/service-provider-orders";
  }

  handleComplete(order_id) {
    window.location = `/service-provider-rating/${order_id}`;
  }

  render() {
    const { length: count } = this.state.orders;
    const { pageSize, currentPage, orders: allOrders } = this.state;

    const orders = paginate(allOrders, currentPage, pageSize);

    return (
      <div className="signup-form">
        <div className={classes.container}>
          <div className={classes.row}>
            <div className="col-md-12">
              <table className={classes.table}>
                <thead>
                  <tr>
                    <th>Customer</th>
                    <th>Status</th>
                    <th>Amount</th>
                    <th>Start Date</th>
                    <th>Start Time</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((item) => (
                    <tr className={classes.tr} key={item._id}>
                      <td>{item.customer_name}</td>
                      <td>{item.status}</td>
                      <td>{item.amount}</td>
                      <td>{item.startTime.slice(0, 10)}</td>
                      <td>{item.startTime.slice(11, 16)}</td>
                      <td>
                        {item.status === "Pending" && (
                          <div>
                            <button
                              className={`${classes.btn} btn-primary rounded`}
                              onClick={() => this.handleAccept(item._id)}
                            >
                              Accept
                            </button>
                            <button
                              className={`${classes.btn} btn-danger rounded`}
                              onClick={() => this.handleCancel(item._id)}
                            >
                              Reject
                            </button>
                          </div>
                        )}
                        {item.status === "Open" && (
                          <div>
                            <button
                              className={`${classes.btn} btn-success rounded`}
                              onClick={() => this.handleComplete(item._id)}
                            >
                              Mark Complete
                            </button>

                            <button
                              className={`${classes.btn} btn-danger rounded`}
                              onClick={() => this.handleCancel(item._id)}
                            >
                              Cancel
                            </button>
                          </div>
                        )}
                        {item.status === "Reviewing" && (
                          <div>
                            <button
                              className={`${classes.btn} bg-lightBlue-900 active:bg-lightBlue-900 hover:bg-lightBlue-900 rounded`}
                              disabled
                            >
                              Under Reviewing
                            </button>
                          </div>
                        )}
                        {item.status === "Rating" && (
                          <div>
                            <button
                              className={`${classes.btn} btn-success rounded`}
                              onClick={() => this.handleComplete(item._id)}
                            >
                              Mark Complete
                            </button>
                          </div>
                        )}
                        {item.status === "Closed" && (
                          <button
                            className={`${classes.btn} bg-orange-500 active:bg-orange-200 hover:bg-orange-200  rounded`}
                            disabled
                          >
                            Finished
                          </button>
                        )}
                        {item.status === "Canceled" && (
                          <button
                            className={`${classes.btn} btn-secondary rounded`}
                            disabled
                          >
                            Canceled
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                  <tr></tr>
                </tbody>
                <div>
                  <Pagination
                    itemsCount={count}
                    pageSize={this.state.pageSize}
                    currentPage={this.state.currentPage}
                    onPageChange={this.handlePageChange}
                  />
                </div>
              </table>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
