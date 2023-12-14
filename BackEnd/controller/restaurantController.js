const Joi = require("joi");
const Restaurant = require("../Models/restaurant");
const { BACKEND_SERVER_PATH } = require("../config/index");
const RestaurantDto = require("../dto/restaurant");

const mongodbIdPattern = /^[0-9a-fA-F]{24}$/;
const restaurantController = {
  async getAll(req, res, next) {
    try {
      const restaurants = await Restaurant.find({});

      const restaurantDto = [];

      for (let i = 0; i < restaurants.length; i++) {
        const dto = new RestaurantDto(restaurants[i]);
        restaurantDto.push(dto);
      }
      console.log("all");

      return res.status(200).json({ restaurants: restaurantDto });
    } catch (error) {
      return next(error);
    }
  },
  async featured(req,res,next){
    let restaurant;
    try {
       restaurant=await Restaurant.find({featured:true})
       const restaurantDto = [];

      for (let i = 0; i < restaurant.length; i++) {
        const dto = new RestaurantDto(restaurant[i]);
        restaurantDto.push(dto);
      }
    
    console.log("featured")

    return res.status(200).json({ restaurant: restaurantDto });

    } catch (error) {
      return next(error)
      
    }
  },

  async getByName(req, res, next) {
  
    let restaurant;
  
    const {name} = req.params;
    console.log(name);
    try {
      restaurant = await Restaurant.findOne({ name: name });
    } catch (error) {
      return next(error);
    }
  
    const restaurantDto = new RestaurantDto(restaurant);
    
  
    return res.status(200).json({ restaurant: restaurantDto });
  },


  async getById(req, res, next) {
    const getByIdSchema = Joi.object({
      id: Joi.string().regex(mongodbIdPattern).required(),
    });

    const { error } = getByIdSchema.validate(req.params);

    if (error) {
      return next(error);
    }

    let restaurant;

    const { id } = req.params;

    try {
      restaurant = await Restaurant.findOne({ _id: id });
    } catch (error) {
      return next(error);
    }

    const restaurantDto = new RestaurantDto(restaurant);
    console.log("byidR")

    return res.status(200).json({ restaurant: restaurantDto });
  },
  async makeFeatured(req, res, next) {
    const { name } = req.params;
    console.log(name);
  
    try {
      // Update the document directly without using a separate variable
      await Restaurant.updateOne({ name: name }, { $set: { featured: true } });
  
      // Check if the update was successful
      const updatedRestaurant = await Restaurant.findOne({ name: name });
  
      if (updatedRestaurant && updatedRestaurant.featured) {
        return res.status(200).json({ message: "Restaurant featured" });
      } else {
        return res.status(404).json({ message: "Restaurant not found or not updated" });
      }
    } catch (error) {
      return next(error);
    }
  },
  
  async topRated(req,res,next){
    let restaurant;
    try {
       restaurant=await Restaurant
       .find({})
       .sort({ systemRating: -1 }) // Sort by rating in descending order
       .limit(6);
   
       const restaurantDto = [];

      for (let i = 0; i < restaurant.length; i++) {
        const dto = new RestaurantDto(restaurant[i]);
        restaurantDto.push(dto);
      }
    
    console.log("top rated")

    return res.status(200).json({ restaurant: restaurantDto });

    } catch (error) {
      return next(error)
      
    }



},
}




  
module.exports = restaurantController;
