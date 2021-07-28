const { Router } = require("express");
const router = Router();

router.use(require("./claims.route"));

router.use(require("./comments.route"));

router.use(require("./status.route"));

module.exports = router;
