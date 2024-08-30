// routes/userRoutes.js
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.post('/users', userController.createUser);
router.get('/users', userController.getUsers);
router.get('/users/removed', userController.getRemovedUsers);
router.delete('/users/:id', userController.deleteUser);

module.exports = router;
