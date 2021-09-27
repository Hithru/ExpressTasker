import React, { Component } from "react";
import axios from "axios";
import auth from "../../services/customerAuth";
import { getCustomerOrders, cancelOrder } from "../../services/orderService";
import Pagination from "../common/pagination";
import { paginate } from "../../utils/paginate";
import classes from "./customerOrderTable.module.css";
import "./customerOrderTable.module.css";
export default class CustomerOrderTable extends Component {
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
    const ordersArray = await getCustomerOrders(user._id);
    const orders = ordersArray.data;
    this.setState({ user, orders });
  }

  handlePageChange = (page) => {
    this.setState({ currentPage: page });
  };

  async handleCancel(order_id) {
    const order = await cancelOrder(order_id);
    window.location = "/customer-orders";
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
                      <td>{item.serviceProvider_name}</td>
                      <td>{item.status}</td>
                      <td>{item.amount}</td>
                      <td>{item.startTime.slice(0, 10)}</td>
                      <td>{item.startTime.slice(11, 16)}</td>
                      <td>
                        {item.status === "Pending" && (
                          <div>
                            <button
                              className={`${classes.btn} btn-danger`}
                              onClick={() => this.handleCancel(item._id)}
                            >
                              Cancel
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
                            <button className={`${classes.btn} btn-success`}>
                              Mark Complete
                            </button>
                          </div>
                        )}
                        {item.status === "Rating" && (
                          <div>
                            <button
                              className={`${classes.btn} btn-info`}
                              disabled
                            >
                              Under Rating
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
