import React, { Component } from "react";
import "./serviceProviderRating.css";
import { getOrder, ratingOrder } from "../../services/orderService";
import { createRating } from "../../services/ratingService";

export default class ServiceProviderRating extends Component {
  state = {
    data: {
      order_id: "",
      serviceProvider_id: "",
      serviceProvider_name: "",
      customer_id: "",
      customer_name: "",
      rating: 0,
    },
  };
  async componentDidMount() {
    await this.populateData();
  }

  async populateData() {
    try {
      const order_id = this.props.match.params.id;

      const { data: order } = await getOrder(order_id);

      const serviceProvider_id = order[0].serviceProvider_id;
      const serviceProvider_name = order[0].serviceProvider_name;
      const customer_id = order[0].customer_id;
      const customer_name = order[0].customer_name;
      this.setState({
        data: {
          order_id,
          serviceProvider_id,
          serviceProvider_name,
          customer_id,
          customer_name,
        },
      });
    } catch (ex) {
      if (ex.response && ex.response.status === 404)
        this.props.history.replace("/not-found");
    }
  }

  doSubmit = async () => {
    try {
      const response = await createRating(this.state.data);
      const order = await ratingOrder(this.state.data.order_id);
      window.location = "/service-provider-orders";
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
      }
    }
  };

  handleSubmit = (e) => {
    e.preventDefault();

    this.doSubmit();
  };

  handleChange = ({ currentTarget: input }) => {
    const data = { ...this.state.data };
    data[input.name] = input.value;

    this.setState({ data });
  };

  render() {
    return (
      <div className="signup-window">
        <div className="signup-form">
          <h2>How was your Experience with</h2>
          <h2>{this.state.data.customer_name.toUpperCase()}</h2>
          <form className="signup-form" onSubmit={this.handleSubmit}>
            <div className="rating">
              <input
                type="radio"
                name="rating"
                value="5"
                id="5"
                onChange={this.handleChange}
              />
              <label for="5">☆</label>

              <input
                type="radio"
                name="rating"
                value="4"
                id="4"
                onChange={this.handleChange}
              />
              <label for="4">☆</label>

              <input
                type="radio"
                name="rating"
                value="3"
                id="3"
                onChange={this.handleChange}
              />
              <label for="3">☆</label>

              <input
                type="radio"
                name="rating"
                value="2"
                id="2"
                onChange={this.handleChange}
              />
              <label for="2">☆</label>

              <input
                type="radio"
                name="rating"
                value="1"
                id="1"
                onChange={this.handleChange}
              />
              <label for="1">☆</label>
            </div>

            <button type="submit" className="signup-submit-button">
              Submit Rating
            </button>
          </form>
        </div>
      </div>
    );
  }
}
