const { Router } = require("express");
const router = Router();
const statusControllers = require("../controllers/status.controller");

router.get("/status", statusControllers.getStatus);
router.post("/status", statusControllers.postStatus);

module.exports = router;
