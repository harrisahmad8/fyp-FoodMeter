const mongoose = require("mongoose");
const { Schema } = mongoose;
const scrapSchema = new Schema(
  {
    content: { type: String, required: true },
    restaurant: { type: mongoose.SchemaTypes.ObjectId, ref: 'Restaurant' },
  },
  { timestamps: true }
);
module.exports = mongoose.model("ScrapComment", scrapSchema, "scrapcomments");