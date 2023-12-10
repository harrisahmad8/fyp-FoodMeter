class RestaurantDTO{
    constructor(restaurant){
        this._id = restaurant._id;
        this.name = restaurant.name;
        this.logoPath = restaurant.logoPath;
        this.foodType = restaurant.foodType;
        this.featured = restaurant.featured || null  ; 
        this.systemComments = restaurant.systemComments.map(comment => ({
            content: comment.content,
            rating: comment.rating
          }));
        this.systemRating = restaurant.systemRating || null;
    }
}
module.exports=RestaurantDTO;