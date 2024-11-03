const express = require('express');
const { registerBox, updateBox, findOneBox, findAllBoxs, deleteBox } = require('../controllers/Cash');
const router = express.Router();

router.post('/', registerBox);
router.put('/:id', updateBox);
router.get('/:id', findOneBox);
router.get('/', findAllBoxs);
router.delete('/:id', deleteBox);

module.exports = router;