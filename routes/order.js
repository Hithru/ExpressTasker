const router = require("express").Router();
const { Order } = require("../models/order.model");
const authCustomer = require("../middleware/authCustomer");
const authServiceProvider = require("../middleware/authServiceProvider");
const Joi = require("joi");

//Create Order by Customer
router.post("/createOrder", authCustomer, async (req, res) => {
  console.log("data came to backend");
  console.log(req.body);
  const schema = Joi.object({
    customer_id: Joi.string().min(6).required(),
    customer_name: Joi.string().min(6).required(),
    serviceProvider_id: Joi.string().min(6).required(),
    serviceProvider_name: Joi.string().min(6).required(),
    amount: Joi.number().required(),
    description: Joi.string().required(),
    status: Joi.string(),
    startTime: Joi.date(),
  });

  const { error } = schema.validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  console.log("validation pass");

  const order = new Order({
    customer_id: req.body.customer_id,
    customer_name: req.body.customer_name,
    serviceProvider_id: req.body.serviceProvider_id,
    serviceProvider_name: req.body.serviceProvider_name,
    amount: req.body.amount,
    description: req.body.description,
    status: req.body.status,
    startTime: req.body.startTime,
  });
  await order.save();
  console.log(order);
  res.send(order);
});

//Getting all orders Belong to specific customer
router.post("/customer", authCustomer, async (req, res) => {
  console.log(req.body.customer_id);
  const orders = await Order.find({ customer_id: req.body.customer_id }).sort(
    "-status"
  );

  console.log(orders);
  res.send(orders);
});

//Getting specific order details
router.post("/details", async (req, res) => {
  console.log(req.body.order_id);
  const order = await Order.find({ _id: req.body.order_id });

  console.log(order);
  res.send(order);
});

//Getting All orders belong to service Provider
router.post("/serviceProvider", authServiceProvider, async (req, res) => {
  console.log(req.body.serviceProvider_id);
  const orders = await Order.find({
    serviceProvider_id: req.body.serviceProvider_id,
  }).sort("-status");

  console.log(orders);
  res.send(orders);
});

//getting unclosed orders which are specific to both customer and service provider
router.post("/commonUnclosedOrders", async (req, res) => {
  const customer_id = req.body.customer_id;
  const service_provider_id = req.body.service_provider_id;
  const closed_string = "Closed";
  const cancel_string = "Canceled";
  const pending_string = "Pending";
  const orders = await Order.find({
    $and: [
      { serviceProvider_id: service_provider_id },
      { customer_id: customer_id },
      {
        $and: [
          { status: { $not: { $eq: cancel_string } } },
          { status: { $not: { $eq: closed_string } } },
          { status: { $not: { $eq: pending_string } } },
        ],
      },
    ],
  });
  res.send(orders);
});

//Cancel a specific order
router.post("/cancel", async (req, res) => {
  console.log(req.body.order_id);
  const order = await Order.findByIdAndUpdate(req.body.order_id, {
    status: "Canceled",
  });

  if (!order)
    return res.status(404).send("The order with the given ID was not found.");

  res.send(order);
});

//Accepting a specific order
router.post("/accept", async (req, res) => {
  console.log(req.body.order_id);
  const order = await Order.findByIdAndUpdate(req.body.order_id, {
    status: "Open",
  });

  if (!order)
    return res.status(404).send("The order with the given ID was not found.");

  res.send(order);
});

//Order status change after customer review
router.post("/review", async (req, res) => {
  console.log(req.body.order_id);
  const keep_order = await Order.find({
    _id: req.body.order_id,
  });
  console.log(keep_order[0].status);
  if (keep_order[0].status === "Reviewing") {
    const order = await Order.findByIdAndUpdate(req.body.order_id, {
      status: "Closed",
    });
    res.send(order);
    return;
  } else {
    const order = await Order.findByIdAndUpdate(req.body.order_id, {
      status: "Rating",
    });

    res.send(order);
  }
});

//Order status change after service provider rating
router.post("/rating", async (req, res) => {
  console.log(req.body.order_id);
  const keep_order = await Order.find({
    _id: req.body.order_id,
  });
  console.log(keep_order[0].status);
  if (keep_order[0].status === "Rating") {
    const order = await Order.findByIdAndUpdate(req.body.order_id, {
      status: "Closed",
    });
    res.send(order);
    return;
  } else {
    const order = await Order.findByIdAndUpdate(req.body.order_id, {
      status: "Reviewing",
    });

    res.send(order);
  }
});

//Listening to the payment notification on the back end
router.post("/paymentListen", async (req, res) => {
  const merchant_id = req.body.merchant_id;
  const order_id = req.body.order_id;
  const payhere_amount = req.body.payhere_amount;
  const payhere_currency = req.body.payhere_currency;
  const status_code = req.body.status_code;
  const payhere_secret = req.body.payhere_secret;
  const md5sig = req.body.md5sig;
  const checking_value = strtoupper(
    md5(
      merchant_id +
        order_id +
        payhere_amount +
        payhere_currency +
        status_code +
        strtoupper(md5(payhere_secret))
    )
  );
  if (md5sig == checking_value) {
    res.send("OK");
    console.log("Payment OK");
  }
});

module.exports = router;
