const { check, validationResult } = require('express-validator');
const User = require('../models/User');

const validateCreateUser = [
  check('name')
    .isString()
    .notEmpty()
    .withMessage('O nome é obrigatório.')
    .isLength({ min: 3 })
    .withMessage('O nome deve ter pelo menos 3 caracteres.')
    .custom(async (value) => {
      const normalizedUserName = value.toLowerCase();
      const user = await User.findOne({ name: normalizedUserName });
      if (user) {
        return Promise.reject('Usuário já registrado no banco de dados.');
      }
    }),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  }
];

const validateLogin = [
  check('name')
    .isString()
    .notEmpty()
    .withMessage('O nome é obrigatório.')
    .isLength({ min: 3 })
    .withMessage('O nome deve ter pelo menos 3 caracteres.'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  }
];

module.exports = {
  validateCreateUser,
  validateLogin,
};
