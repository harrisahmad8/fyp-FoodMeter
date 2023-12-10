const mongoose= require('mongoose')
const {Schema}=mongoose;
const CommentSchema = new Schema({
  content: { type: String, required: true },
  rating: { type: Number, required: true },
  
});
const restaurantSchema=new Schema({ 
  name: { type: String, required: true },
  logoPath: { type: String },
  foodType: { type: String },
  featured: { type: Boolean },
  systemComments: [CommentSchema],
  systemRating: { type: Number }

},
   {timestamps:true}
);
module.exports=mongoose.model('Restaurant',restaurantSchema,'restaurants');
