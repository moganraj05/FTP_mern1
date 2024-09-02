const express = require('express');
const { getBmis, createBmi, deleteBmi } = require('../controllers/bmiController');
const requireAuth = require('../middleware/requireAuth')

const router = express.Router();


// require auth for all workout routes
router.use(requireAuth)

router.get('/', getBmis);
router.post('/', createBmi);

// New delete route
router.delete('/:id', deleteBmi);

module.exports = router;
