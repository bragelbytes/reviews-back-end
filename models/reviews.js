const mongoose = require("mongoose")

const reviewSchema = new mongoose.Schema({
  title: {type:String, required:true},
  image: {type:String, required:true},
  releaseDate: {type:String, required:true},
  platform: {type:String, required:true},
  category: {type:String, required:true},
  rating: {type: Number, min: 1, max: 10 },
  review: {type:String, required:true},
  reviewPerson: {type:String, required:true}
})

const Reviews = mongoose.model("Reviews", reviewSchema)

module.exports = Reviews
