const { Router } = require("express");
const claimControllers = require("../controllers/claims.controller");
const router = Router();

router.get("/", claimControllers.getClaim);
router.post("/admin/claim", claimControllers.postClaim);
router.delete("/claim/:id", claimControllers.deleteClaim);

module.exports = router;
