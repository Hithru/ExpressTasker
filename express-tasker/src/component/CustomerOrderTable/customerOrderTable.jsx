import React, { Component } from "react";
import axios from "axios";
import auth from "../../services/customerAuth";
import { getCustomerOrders } from "../../services/orderService";
import Pagination from "../common/pagination";
import { paginate } from "../../utils/paginate";

export default class CustomerOrderTable extends Component {
  constructor(props) {
    super(props);

    this.state = {
      orders: [],
      user: "",
      currentPage: 1,
      pageSize: 2,
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
  render() {
    const { length: count } = this.state.orders;
    const { pageSize, currentPage, orders: allOrders } = this.state;

    const orders = paginate(allOrders, currentPage, pageSize);

    return (
      <div className="signup-window">
        <table className="table">
          <thead>
            <tr>
              <th>Service Provider</th>
              <th>Status</th>
              <th>Amount</th>
              <th>Start Time</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((item) => (
              <tr key={item._id}>
                <td>{item.serviceProvider_id}</td>
                <td>{item.status}</td>
                <td>{item.amount}</td>
                <td>{item.startTime}</td>
                <td>
                  <p>
                    <button className="btn btn-success">Mark Complete</button>
                    <button className="btn btn-danger">Cancel</button>
                  </p>
                </td>
              </tr>
            ))}
            <tr></tr>
          </tbody>
          <tfoot>
            <Pagination
              itemsCount={count}
              pageSize={this.state.pageSize}
              onPageChange={this.handlePageChange}
            />
          </tfoot>
        </table>
      </div>
    );
  }
}
