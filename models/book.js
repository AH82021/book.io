import mongoose from "mongoose";




const Schema =mongoose.Schema

const reviewSchema = new Schema({
  content: String,
  rating: {type: Number, min: 1, max: 5, default: 5}
}, {
  timestamps: true
})
const bookSchema = new Schema({

  title :String,
  author:String,
  genre :String,
  read :Boolean,
  owner: {type: Schema.Types.ObjectId, ref: "Profile"},
  reviews :[reviewSchema],
  
  }, { timestamps: true 

}) 


const Book = mongoose.model('Book', bookSchema)


export {
  Book
}