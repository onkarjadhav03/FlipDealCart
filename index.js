let express = require('express');
//const { resolve } = require('path');
let cors = require('cors');

let app = express();
app.use(cors());
const port = 3010;

//app.use(express.static('static'));

let taxRate = 5; //5%
let discountPercentage = 10; //10%
let loyaltyRate = 2; // 2 points per 1$

//Endpoint 1 Calculate the total price of items in the cart
app.get('/cart-total', (req, res) => {
  let newItemPrice1 = parseFloat(req.query.newItemPrice1);
  let newItemPrice2 = parseFloat(req.query.newItemPrice2);
  let newItemPrice3 = parseFloat(req.query.newItemPrice3);

  let totalCartPrice = newItemPrice1 + newItemPrice2 + newItemPrice3;
  res.send(totalCartPrice.toString());
});

//Endpoint 2 : Apply a discount based on membership status
app.get('/membership-discount', (req, res) => {
  let cartTotal = parseFloat(req.query.cartTotal);
  let isMember = (req.query.isMember = 'false');
  let totalCartPrice;
  if (isMember) {
    let discount = cartTotal * (discountPercentage / 100);
    totalCartPrice = cartTotal - discount;
  }

  res.send(totalCartPrice.toString());
});

//Endpoint 3 : Calculate tax on the cart total
app.get('/calculate-tax', (req, res) => {
  let cartTotal = parseFloat(req.query.cartTotal);
  let tax = cartTotal * (taxRate / 100);
  res.send(tax.toString());
});

//Endpoint 4 : Estimate delivery time based on shipping method
app.get('/estimate-delivery', (req, res) => {
  let shippingMethod = req.query.shippingMethod;
  let distance = parseFloat(req.query.distance);
  let numberOfDays;
  if (shippingMethod === 'express') {
    numberOfDays = distance / 100;
  } else {
    numberOfDays = distance / 50;
  }

  res.send(numberOfDays.toString());
});

//Endpoint 5 : Calculate the shipping cost based on weight and distance
app.get('/shipping-cost', (req, res) => {
  let weight = parseFloat(req.query.weight);
  let distance = parseFloat(req.query.distance);

  let shippingCost = weight * distance * 0.1;

  res.send(shippingCost.toString());
});

//Endpoint 6 : Calculate loyalty points earned from a purchase
app.get('/loyalty-points', (req, res) => {
  let purchaseAmount = parseFloat(req.query.purchaseAmount);

  let loyaltyPoints = purchaseAmount * loyaltyRate;

  res.send(loyaltyPoints.toString());
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
