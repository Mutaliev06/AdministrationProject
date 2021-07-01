const { Router} = require('express')
const commentControllers = require('../controllers/comments')
const router = Router()

router.get('/claim/:id/comments', commentControllers.getComments)
router.post('/claim/:id/comment', commentControllers.postComment)
router.patch('/claim/:id/comment/:id', commentControllers.patchComment);

module.exports = router