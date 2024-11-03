const express = require('express');
const { register, updateUser, findOneUser, findAllUsers, deleteUser } = require('../controllers/User');
const router = express.Router();

router.post('/', register);
router.put('/:id', updateUser);
router.get('/:id', findOneUser);
router.get('/', findAllUsers);
router.delete('/:id', deleteUser);

module.exports = router;