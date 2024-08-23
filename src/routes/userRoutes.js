const express = require('express');
const User = require('../models/User');
const authMiddleware = require('../middleware/authMiddleware');
const { validateCreateUser } = require('../middleware/validators');

const router = express.Router();

// Rotas protegidas com middleware de autenticação
router.use(authMiddleware);

// Criação de usuário
router.post('/', validateCreateUser, async (req, res) => {
  try {
    const { name } = req.body;
    const normalizedUserName = name.toLowerCase();
    let user = await User.findOne({ name: normalizedUserName });

    if (user) {
      if (user.active) {
        return res.status(400).send('Usuário já registrado no banco de dados.');
      } else {
        return res.status(400).send('Usuário já foi cadastrado e removido do banco de dados.');
      }
    }

    user = new User({ name: normalizedUserName });
    await user.save();
    res.status(201).send(user);
  } catch (error) {
    res.status(500).send('Erro ao salvar o usuário: ' + error.message);
  }
});

// Lista de usuários ativos
router.get('/', async (req, res) => {
  try {
    const users = await User.find({ active: true });
    res.status(200).send(users);
  } catch (error) {
    res.status(500).send('Erro ao buscar usuários: ' + error.message);
  }
});

// Lista de usuários removidos
router.get('/removed', async (req, res) => {
  try {
    const removedUsers = await User.find({ active: false });
    res.status(200).send(removedUsers);
  } catch (error) {
    res.status(500).send('Erro ao buscar usuários removidos: ' + error.message);
  }
});

// Remoção de usuário
router.delete('/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).send('Usuário não encontrado.');

    user.active = false;
    await user.save();
    res.status(204).send(); // No content for successful delete
  } catch (error) {
    res.status(500).send('Erro ao remover o usuário: ' + error.message);
  }
});

module.exports = router;
