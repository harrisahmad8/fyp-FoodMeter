const express = require('express');
 
const router = express.Router();
const authController=require('../controller/authController')
const auth=require('../middlewares/auth');
const restaurantController= require('../controller/restaurantController');
const bookingController=require('../controller/bookingController');
const commentController=require('../controller/commentController');
const userController=require('../controller/userController')
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
router.get('/restaurant/:name',auth,restaurantController.getByName)






module.exports = router;