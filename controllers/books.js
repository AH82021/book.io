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

}

function create(req, res) {
  req.body.owner = req.user.profile._id
	req.body.read = !!req.body.read
  Book.create(req.body)
  .then(book => {
    res.redirect('/books')
  })
  .catch(err => {
    console.log(err)
    res.redirect('/books')
  })
}

export {

  index,
  create
}