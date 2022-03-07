import { Router } from "express";
import * as booksCtrl from '../controllers/books.js'
import { isLoggedIn } from '../middleware/middleware.js'

const router = Router() 

router.get('/',booksCtrl.index)
// POST - localhost:3000/profiles/new
router.post('/',isLoggedIn,booksCtrl.create)

export {
  router
}