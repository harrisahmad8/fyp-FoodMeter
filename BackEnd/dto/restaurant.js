class RestaurantDTO{
    constructor(restaurant){
        this._id = restaurant._id;
        this.name = restaurant.name;
        this.logoPath = restaurant.logoPath;
        this.userRating = restaurant.userRating;
        this.foodType = restaurant.foodType;
        this.featured = restaurant.featured || null;
        this.userComments = restaurant.userComments || []; 
        this.systemComments = restaurant.systemComments || []; 
        this.systemRating = restaurant.systemRating || null;
    }
}
module.exports=RestaurantDTO;