import React from "react";
import Joi from "joi-browser";
import Form from "../common/form";
import auth from "../../services/customerAuth";
import order from "../../services/orderService";
import "./createOrder.css";

export default class CreateOrder extends Form {
  state = {
    data: {
      serviceProvider_id: "",
      serviceProvider_name: "",
      customer_name: "",
      customer_id: "",
      amount: "",
      status: "Pending",
      startTime: "",
    },
    errors: {},
  };

  schema = {
    serviceProvider_id: Joi.required(),
    serviceProvider_name: Joi.required(),
    customer_name: Joi.required(),
    customer_id: Joi.required(),
    status: Joi.required(),
    amount: Joi.required().label("Amount"),
    startTime: Joi.required().label("StartTime"),
  };

  async componentDidMount() {
    const customer = auth.getCurrentUser();
    const customer_id = customer._id;
    const customer_name = customer.username;
    const serviceProvider_name = "Shamila Nuwan";
    const serviceProvider_id = "61456374e6137e03ac29478b";
    const status = "Pending";

    this.setState({
      data: {
        customer_id,
        customer_name,
        serviceProvider_name,
        serviceProvider_id,
        status,
      },
    });
  }

  doSubmit = async () => {
    try {
      console.log("work one");
      const response = await order.createOrder(this.state.data);
      console.log("work here");

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
            <form className="signup-form">
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
            </form>
            <form onSubmit={this.handleSubmit} className="signup-form">
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
