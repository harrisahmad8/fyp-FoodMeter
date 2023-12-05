const mongoose= require('mongoose')
const {Schema}=mongoose;
const restaurantSchema=new Schema({ 
    name: { type: String, required: true },
  logoPath: { type: String },
  userRating: { type: Number},
  foodType: { type: String },
  featured: { type: Boolean },
  userComments: [{ type: String }], 
  systemComments: [{ type: String }], 
  systemRating: { type: Number }

},
   {timestamps:true}
);
module.exports=mongoose.model('Restaurant',restaurantSchema,'restaurants');
