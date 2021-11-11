import "./paymentform.css";
import Select from "@material-ui/core/Select";
import { TextField } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import { apiUrl } from "../../config.json";
import { useEffect } from "react";
import { useState } from "react";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
const axios = require("axios").default;

const PaymentForm = ({
  isRecipientServiceProvider,
  conversation,
  currentUser,
}) => {
  const [customer, setCustomer] = useState(currentUser);
  const [service_provider, setServiceProvider] = useState({});
  const [unclosed_orders, setUnclosedOrders] = useState([]);
  const [open, setOpen] = useState(false);

  const [selected_order_id, setSelectedOrderId] = useState(null);
  const [amount, setAmount] = useState(null);
  useEffect(() => {
    const secondPartyId = conversation?.members.find(
      (m) => m !== currentUser._id
    );
    getServiceProvider(secondPartyId);
  }, [conversation]);

  useEffect(() => {
    getUnclosedOrders(customer._id, service_provider?._id);
  }, [service_provider]);
  const getUnclosedOrders = async (customer_id, service_provider_id) => {
    try {
      const res = await axios.post(apiUrl + "/order/commonUnclosedOrders", {
        customer_id: customer_id,
        service_provider_id: service_provider_id,
      });
      console.log("Hi");
      console.log(res.data);
      setUnclosedOrders(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const getServiceProvider = async (user_id) => {
    try {
      const res = await axios.post(apiUrl + "/serviceProvider/" + user_id);
      console.log(res.data);
      setServiceProvider(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  var payment = {
    sandbox: true, // if the account is sandbox or real
    merchant_id: service_provider?.merchantId, // Replace your Merchant ID
    return_url: "/messenger",
    cancel_url: "/messenger",
    notify_url: apiUrl + "/order/paymentListen/",
    order_id: selected_order_id,
    items: "",
    amount: amount,
    currency: "LKR",
    first_name: customer.username,
    last_name: "",
    email: customer.email,
    phone: "",
    address: customer.location,
    city: customer.location,
    country: "Sri Lanka",
  };

  window.payhere.onCompleted = function onCompleted(orderId) {
    console.log("Payment completed. OrderID:" + orderId);
    //Note: validate the payment and show success or failure page to the customer
  };

  window.payhere.onDismissed = function onDismissed() {
    //Note: Prompt user to pay again or show an error page
    console.log("Payment dismissed");
  };

  window.payhere.onError = function onError(error) {
    // Note: show an error page
    console.log("Error:" + error);
  };

  const processPayment = () => {
    if (!service_provider.merchantId == "") {
      if (!selected_order_id == "" && !amount == "") {
        window.payhere.startPayment(payment);
      }
    } else {
      setOpen(true);
    }
  };

  const renderOption = (order) => {
    return (
      <option key={order._id} value={order._id}>
        {order.description}
      </option>
    );
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  return (
    <div>
      {unclosed_orders.length > 0 ? (
        <div>
          <Snackbar open={open} autoHideDuration={4000} onClose={handleClose}>
            <MuiAlert
              onClose={handleClose}
              severity="error"
              elevation={6}
              variant="filled"
            >
              No Payhere Account specified for Service Provider. Ask for support
              !
            </MuiAlert>
          </Snackbar>
          <div className="paymentFormTopic">Payment</div>
          <div
            className="paymentFormCard"
            style={{
              justifyItems: "center",
              position: "relative",
            }}
          >
            {console.log(unclosed_orders)}
            <Select
              className="orderSelect"
              value={selected_order_id}
              onChange={(event) => {
                setSelectedOrderId(event.target.value);
              }}
              name="order_id"
              variant="outlined"
              required
              margin="normal"
              style={{ backgroundColor: "white", width: "85%" }}
            >
              {unclosed_orders.map(renderOption)}
            </Select>
            <TextField
              className="textArea"
              value={amount}
              onChange={(event) => {
                setAmount(event.target.value);
              }}
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="amount"
              label="Amount"
              name="amount"
              type="number"
              style={{ backgroundColor: "white", width: "85%" }}
            />
            <Button
              onClick={processPayment}
              value="Buy Now"
              fullWidth
              variant="contained"
              color="primary"
              style={{
                backgroundColor: "#f28f00",
                width: "80%",
                marginTop: "5%",
                fontWeight: "bold",
              }}
            >
              Pay
            </Button>
          </div>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default PaymentForm;
