import React from "react";
import Joi from "joi-browser";
import Form from "../common/form";
import auth from "../../services/customerAuth";
import order from "../../services/orderService";
import "./createOrder.css";

export default class CreateOrder extends Form {
  state = {
    data: {
      serviceProvider_id: "61456374e6137e03ac29478b",
      serviceProvider_name: "Shamila Nuwan",
      customer_name: "",
      customer_id: "",
      amount: "",
      status: "Pending",
      startTime: "",
    },
    errors: {},
  };

  schema = {
    amount: Joi.number(),
    startTime: Joi.date(),
  };

  async componentDidMount() {
    const customer = auth.getCurrentUser();
    const customer_id = customer._id;
    const customer_name = customer.username;
    this.setState({ data: { customer_id, customer_name } });
  }

  doSubmit = async () => {
    try {
      console.log("work");
      const response = await order.createOrder(this.state.data);
      console.log("work");
      auth.loginWithJwt(response.headers["x-auth-token"]);
      window.location = "/customer-orders";
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        const errors = { ...this.state.errors };
        errors.email = ex.response.data;
        this.setState({ errors });
      }
    }
  };

  render() {
    return (
      <div>
        <div className="signup-window">
          <div className="signup-form">
            <h2>Order Request</h2>
            <form onSubmit={this.handleSubmit} className="signup-form">
              <div className="email">
                <label>Customer Name</label>
                <input
                  className="form-control"
                  value={this.state.data.customer_name}
                  disabled
                />
              </div>
              <div className="email">
                <label>ServiceProvider Name</label>
                <input
                  className="form-control"
                  value={this.state.data.serviceProvider_name}
                  disabled
                />
              </div>
              {this.renderInput("amount", "Amount")}
              {this.renderInput("startTime", "StarTime", "datetime-local")}
              {this.renderButton("Create Request")}
            </form>
          </div>
        </div>
      </div>
    );
  }
}
