import mongoose from "mongoose";

const Schema =mongoose.Schema
const bookSchema = new Schema({

  title :String,
  author:String,
  genre :String,
  read :Boolean,
  owner: {type: Schema.Types.ObjectId, ref: "Profile"}



}) 
const Book = mongoose.model('Book', bookSchema)


export {
  Book
}