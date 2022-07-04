import { Book } from "../models/book.js";
import axios from "axios";
import "dotenv/config"


function index(req, res) {
   Book.find({})
  .then(books => {
    res.render('books/books', {
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

function show(req, res) {
  Book.findById(req.params.id)
  .populate("owner")
  .then(book => {
    res.render('books/show', {
      book,
      title: "Book show"
    })
  })
  .catch(err => {
    console.log(err)
    res.redirect('/books')
  })
}
function flipRead(req, res) {
  Book.findById(req.params.id)
  .then(book => {
    book.read = !book.read
    book.save()
    .then(()=> {
      res.redirect(`/books/${book._id}`)
    })
  })
  .catch(err => {
    console.log(err)
    res.redirect('/books')
  })

}

function edit(req, res) {
  Book.findById(req.params.id)
  .then(book => {
    res.render('books/edit', {
      book,
      title: "edit book"
    })
  })
  .catch(err => {
    console.log(err)
    res.redirect('/books')
  })
}

function update(req, res) {
  Book.findById(req.params.id)
  .then(book => {
    if (book.owner.equals(req.user.profile._id)) {
      req.body.read = !!req.body.read
      book.updateOne(req.body, {new: true})
      .then(()=> {
        res.redirect(`/books/${book._id}`)
      })
    } else {
      throw new Error ('🚫 Not authorized 🚫')
    }
  })
  .catch(err => {
    console.log(err)
    res.redirect(`/books`)
  })
}


function deleteBook(req, res) {
  Book.findById(req.params.id)
  .then(book => {
    if (book.owner.equals(req.user.profile._id)) {
      book.delete()
      .then(() => {
        res.redirect('/books')
      })
    } else {
      throw new Error ('🚫 Not authorized 🚫')
    }   
  })
  .catch(err => {
    console.log(err)
    res.redirect('/books')
  })
}


function review(req, res) {
  Book.findById(req.params.id)
  .then(book => {
    res.render('books/review', {
      book,
      title: "Review book"
    })
  })
  .catch(err => {
    console.log(err)
    res.redirect('/books')
  })
}


function createReview(req, res) {
  Book.findById(req.params.id)
  .then(book => {
    if (book.owner.equals(req.user.profile._id)) {
      req.body.read = !!req.body.read
     book.review.push(req.body, {new: true})
       book.save()
      .then(()=> {
        res.render('books/review', {
          book,
          title: "Reviw book"
        })
      })
    } else {
      throw new Error ('🚫 Not authorized 🚫')
    }
  })
  .catch(err => {
    console.log(err)
    res.redirect(`/books`)
  })
}



function bookSearch (req, res){
  axios.get(`https://www.googleapis.com/books/v1/volumes?q=${req.body.search}&key=${process.env.KEY}`)
  .then(response => {
    res.render('books/search',{
      Book: response.data,
      title: "Search book",
      
    })
    
  })
}




export {

  index,
  create,
  show,
  flipRead,
  edit,
  update,
  deleteBook,
  review,
  createReview,
  bookSearch
}