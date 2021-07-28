const { Router } = require("express");
const commentControllers = require("../controllers/comments.controller");
const router = Router();

router.get("/claim/:id/comment", commentControllers.getComments);
router.post("/claim/:id/comment", commentControllers.postComment);
router.patch("/claim/:id/comment", commentControllers.patchComment);

module.exports = router;
