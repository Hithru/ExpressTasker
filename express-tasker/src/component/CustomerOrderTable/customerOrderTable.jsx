import React, { Component } from "react";
import axios from "axios";
import auth from "../../services/customerAuth";
import { getCustomerOrders } from "../../services/orderService";
export default class CustomerOrderTable extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [],
      user: "",
    };
  }

  async componentDidMount() {
    const user = auth.getCurrentUser();
    const orders = await getCustomerOrders(user._id);
    const data = orders.data;
    this.setState({ user, data });
  }

  render() {
    const { data } = this.state;
    return (
      <div class="signup-window">
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
            {data.map((item) => (
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
        </table>
      </div>
    );
  }
}
