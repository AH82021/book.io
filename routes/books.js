import { Router } from "express";
import * as booksCtrl from '../controllers/books.js'
import { isLoggedIn } from '../middleware/middleware.js'

const router = Router() 

router.get('/',booksCtrl.index)
// POST - localhost:3000/profiles/new
router.post('/',isLoggedIn,booksCtrl.create)

router.get('/:id', booksCtrl.show)

router.patch('/:id/flip-read', isLoggedIn, booksCtrl.flipRead)

router.get('/:id/edit', isLoggedIn, booksCtrl.edit)

router.put('/:id', isLoggedIn, booksCtrl.update)

router.delete('/:id', isLoggedIn, booksCtrl.deleteBook)

router.get('/:id/review', isLoggedIn, booksCtrl.review)

router.post('/:id/review', booksCtrl.createReview)

router.post('/search',booksCtrl.bookSearch)

export {
  router
}