/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */
const app = require("express")();
const path = require("path");
const shortid = require("shortid");
const Razorpay = require("razorpay");
const cors = require("cors");
const bodyParser = require("body-parser");

app.use(cors());
app.use(bodyParser.json());

const razorpay = new Razorpay({
  key_id: "rzp_test_Zwqj0pDtOxIsfY",
  key_secret: "VGVVjVU9x1tAocMxQrRI7THx",
});

exports.handler = async (event) => {
  const payment_capture = 1;
  const { amount } = JSON.parse(event.body);
  const currency = "INR";
  const options = {
    amount: amount * 100,
    currency,
    receipt: shortid.generate(),
    payment_capture,
  };

  try {
    const response = await razorpay.orders.create(options);
    console.log(response);
    const res = {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "*",
        "Access-Control-Allow-Methods": "OPTIONS,POST,GET",
      },
      body: JSON.stringify({
        id: response.id,
        currency: response.currency,
        amount: response.amount,
      }),
    };
    return res;
  } catch (error) {
    console.log(error);
    const res = {
      statusCode: 500,
      body: JSON.stringify({
        message: "An error occurred while creating the Razorpay order",
      }),
    };
    return res;
  }
};
