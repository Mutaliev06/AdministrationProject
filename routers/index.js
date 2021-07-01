const { Router } = require('express')
const router = Router();

router.use(require('./claims'));

router.use(require('./comments'));

router.use(require('./status'));

module.exports = router;