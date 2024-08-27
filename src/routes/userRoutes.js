const express = require('express');
const authMiddleware = require('../middleware/authMiddleware');
const { validateCreateUser, validateLogin } = require('../middleware/validators');
const userController = require('../controllers/userController');

const router = express.Router();

router.post('/login', validateLogin, userController.loginUser);

router.use(authMiddleware);

router.post('/', validateCreateUser, userController.createUser);

router.get('/', userController.getUsers);

router.get('/removed', userController.getRemovedUsers);

router.delete('/:id', userController.deleteUser);

module.exports = router;
