const jwt = require('jsonwebtoken');
const User = require('../models/User'); // Importa o modelo de usuário

const authMiddleware = async (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1]; // Supondo que o token seja passado no formato "Bearer token"

  if (!token) {
    return res.status(401).json({ message: 'Token não fornecido.' });
  }

  try {
    const decoded = jwt.verify(token, 'your_jwt_secret'); // Substitua 'your_jwt_secret' pela sua chave secreta

    const user = await User.findById(decoded.id);
    if (!user) {
      return res.status(401).json({ message: 'Usuário não encontrado.' });
    }

    req.user = user;
    next();
  } catch (err) {
    res.status(401).json({ message: 'Token inválido.' });
  }
};

module.exports = authMiddleware;
