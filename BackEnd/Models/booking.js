const mongoose = require("mongoose");
const restaurant = require("./restaurant");
const user=require('./user');
const { string } = require("joi");
const { Schema } = mongoose;
const bookingSchema = new Schema(
  {
    name: { type: String, required: true },
    restaurant: { type:String, required:true },
    email:{type:String,required:true},
    date:{type:String,required:true},
    time:{type:String,required:true},
    guest:{type:Number,required:true},
    number:{type:String,required:true}
  },
  { timestamps: true }
);
module.exports = mongoose.model("Booking", bookingSchema, "bookings");
