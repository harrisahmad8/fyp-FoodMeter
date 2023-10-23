const express = require('express');
 
const router = express.Router();
const authController=require('../controller/authController')
const auth=require('../middlewares/auth');
const restaurantController= require('../controller/restaurantController');
const bookingController=require('../controller/bookingController');
const commentController=require('../controller/commentController');
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

//restaurants

router.get('/restaurant',auth,restaurantController.getAll);

//restaurant by id
router.get('/restaurant/:id',auth,restaurantController.getById);

//Make a booking
router.post('/booking',auth,bookingController.create);

router.get('/booking/:id',auth,bookingController.getByUserId)
//store a comment 

router.post('/comment',auth,commentController.create);

router.get('/comment/:id',auth,commentController.getByRestaurantId)

router.get('/search/:id',auth,)


router.post('/search', (req, res) => {
    console.log('Request to /search received'); // Add this line
    // ... Rest of your code
  });


router.post('/search', (req, res) => {
    try {
      const { keyword } = req.body;
      console.log('Received search request with keyword:', keyword);
      console.log(keyword);
      // Run the Python script as a child process with the provided keyword
      console.log('Executing Python script:', `python ${pythonScriptPath} ${keyword}`);
      exec(`python ${pythonScriptPath} ${keyword}`, (error, stdout, stderr) => {
        if (error) {
          console.error('Error running Python script:', error);
          res.status(500).json({ error: 'Internal server error' });
        } else {
          console.log('Python script executed successfully.');
          console.log('Python script output:', stdout);
          res.json({ message: 'Search completed successfully.' });
        }
      });
    } catch (error) {
      console.error('Error searching:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });



module.exports = router;