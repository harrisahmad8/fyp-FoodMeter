const express = require('express');
 
const router = express.Router();
const authController=require('../controller/authController')
const auth=require('../middlewares/auth');
const restaurantController= require('../controller/restaurantController');
const bookingController=require('../controller/bookingController');
const commentController=require('../controller/commentController');
const userController=require('../controller/userController')
const stripeController=require('../controller/stripeController')
const path = require('path');
const pythonScriptPath = path.join(__dirname, '../controller/searchController.py');

const { exec } = require('child_process');


//register

router.post('/register', authController.register);

//login
router.post('/login', authController.login);



//logout
router.post('/logout',auth, authController.logout)

//refresh
router.get('/refresh',authController.refresh);

//All users
router.get('/users',auth,userController.AllUsers);

//restaurants

router.get('/restaurant',auth,restaurantController.getAll);

router.get('/restaurants/:name',auth,restaurantController.getByName);


//restaurant by id
router.get('/restaurant/:id',auth,restaurantController.getById);





//featured restaurants

router.get('/featuredRestaurant',auth,restaurantController.featured)
//Make a booking
router.post('/booking',auth,bookingController.create);

router.get('/booking/:id',auth,bookingController.getByUserId);
//store a comment 

router.post('/comment',auth,commentController.create);

router.get('/comment/:id',auth,commentController.getByRestaurantId)
router.get('/restaurants/:name',auth,restaurantController.getByName)
router.put('/updateProfile/:id',auth,userController.updateProfile)
router.get('/user/:id',auth,userController.getUserId)
router.post('/stripe', async (req, res) => {
  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: 'Feature Restaurant',
            },
            unit_amount: 1000, // Amount in cents (10 dollars)
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: 'http://localhost:3000/success',
      cancel_url: 'http://localhost:3000/cancel',
    });

    res.json({ id: session.id });
  } catch (error) {
    console.error('Error creating checkout session:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});






module.exports = router;