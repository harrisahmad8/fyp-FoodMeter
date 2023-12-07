const stripeController={
    async  createSession(req,res,next){
        try {
            
            const {products} = req.body;


    const lineItems = products.map((product)=>({
        line_items: [
            {
              price_data: {
                currency: 'usd',
                product_data: {
                  name: 'Your Product Name',
                },
                unit_amount: 1000, // Amount in cents
              },
              quantity: 1,
            },
          ],
    }));

    const session = await stripe.checkout.sessions.create({
        payment_method_types:["card"],
        line_items:lineItems,
        mode:"payment",
        success_url:"http://localhost:3000/sucess",
        cancel_url:"http://localhost:3000/cancel",
    });

    res.json({id:session.id})
        }catch(error){
            return(error)
        }
    }
}
