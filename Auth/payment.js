const paypal = require('paypal-rest-sdk');

paypal.configure({
  mode: 'sandbox', // or 'production'
  client_id: 'AeIVXnwOLWJj1maI5e-Rdrt-RatPCxQISM6oCy4y3RiYJCdhUCDUQ9R8oIuBksZlxaKbagcSuzJ8nAUF',
  client_secret: 'EOgqYOi0w7mamqUCfZDBX3oweaRgLrGqg0GV5lSpyTpKwI2mWJeRQnfAf5ciPOmuUBcDzqkq2zJEmWwV'
});

exports.payment = async (req, res) => {
  const amount = req.body.amount;

  const create_payment_json = {
    intent: 'sale',
    payer: {
      payment_method: 'paypal'
    },
    redirect_urls: {
      return_url: 'http://return.url',
      cancel_url: 'http://cancel.url'
    },
    transactions: [{
      item_list: {
        items: [{
          name: 'item',
          sku: 'item',
          price: amount,
          currency: 'USD',
          quantity: 1
        }]
      },
      amount: {
        currency: 'USD',
        total: amount
      },
      description: 'This is the payment description.'
    }]
  };
  
  paypal.payment.create(create_payment_json, function (error, payment) {
    if (error) {
      res.send(error.response);
    } else {
      res.json({
        paymentID: payment.id
      });
    }
  });
};

