import mongoose from "mongoose";




const Schema =mongoose.Schema

const reviewSchema = new Schema({
  content: String,
  rating: {type: Number, min: 1, max: 5, default: 5}
}, {
  timestamps: true
})
const bookSchema = new Schema({

  title: {
    type: String,
    required: true,
  },

  authors: {
    type: Array,
    required: true,
  },
  genre :String,
  read :Boolean,
  owner: {type: Schema.Types.ObjectId, ref: "Profile"},
  description: { type: String },
  image: { type: String },
  link: { type: String },
  publisher: { type: String },
  publishedDate: { type: String },
  review :[reviewSchema],
  
  }, { timestamps: true 

}) 


const Book = mongoose.model('Book', bookSchema)


export {
  Book
}