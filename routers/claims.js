const { Router } = require('express');
const claimControllers = require('../controllers/claims');
const router = Router();

router.get('/', claimControllers.getClaim)
router.post('/claim', claimControllers.postClaim)
router.delete('/claim/:id', claimControllers.deleteClaim)

module.exports = router