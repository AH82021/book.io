import { raw } from "express";
import { Book } from "../models/book.js";


function index(req, res) {
  Book.find({})
  .then(books => {
    res.render('books/index', {
      books,
      title: "Book",
    })
  })
  .catch(err => {
    console.log(err)
    res.redirect("/books")
  })
  console.log(user);
}

export {

  index
}