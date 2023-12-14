const stripe = require("stripe")("sk_test_51OKNyuK2nOZ0Ouadp0iB20kndEE1Q58Yolz6EMbhAWy4TMBqMYGARbeZzM4LBaNZw1yabwo2vHHbty5lj76Po4uy00DVxqpyho");

const makepayment = async (req, res) => {
  const {products}= req.body;
  console.log(products)
  
  try {
    const lineItems = [
      {
        price_data: {
          currency: "USD",
          product_data: {
            name: "Featured Restaurant",
            description: 'Get your restaurant featured for seven days',
          },
          unit_amount: 10*100,
        },
        quantity: 1,
      },
    ];

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: lineItems,
      mode: "payment",
      success_url: "http://localhost:3000/restaurantDashboard",
      cancel_url: "http://localhost:3000/cancel",
    });

    return res.json({ id: session.id });
  } catch (error) {
    console.error("Error making payment:", error);
    return res.status(500).json({ message: "Error making payment" });
  }
};

module.exports = { makepayment };