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
    console.log("user");
    const user = auth.getCurrentUser();
    console.log(user);
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
                    <th>Service Provider</th>
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
                              className={`${classes.btn} btn-primary`}
                              onClick={() => this.handleAccept(item._id)}
                            >
                              Accept
                            </button>
                            <button
                              className={`${classes.btn} btn-danger`}
                              onClick={() => this.handleCancel(item._id)}
                            >
                              Reject
                            </button>
                          </div>
                        )}
                        {item.status === "Open" && (
                          <div>
                            <button className={`${classes.btn} btn-success`}>
                              Mark Complete
                            </button>
                            <button
                              className={`${classes.btn} btn-danger`}
                              onClick={() => this.handleCancel(item._id)}
                            >
                              Cancel
                            </button>
                          </div>
                        )}
                        {item.status === "Reviewing" && (
                          <div>
                            <button
                              className={`${classes.btn} btn-info`}
                              disabled
                            >
                              Under Review
                            </button>
                          </div>
                        )}
                        {item.status === "Rating" && (
                          <div>
                            <button className={`${classes.btn} btn-success`}>
                              Mark Complete
                            </button>
                          </div>
                        )}
                        {item.status === "Closed" && (
                          <button
                            className={`${classes.btn} btn-warning`}
                            disabled
                          >
                            Finished
                          </button>
                        )}
                        {item.status === "Canceled" && (
                          <button
                            className={`${classes.btn} btn-secondary`}
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
