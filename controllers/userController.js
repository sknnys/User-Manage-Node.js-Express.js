// controllers/userController.js
const User = require('../models/user');

exports.createUser = async (req, res) => {
    const normalizedUserName = req.body.name.toLowerCase();

    try {
        let user = await User.findOne({ where: { name: normalizedUserName } });

        if (user) {
            if (user.active) {
                return res.status(400).json("Usuário já registrado no banco de dados.");
            } else {
                return res.status(400).json("Usuário já foi cadastrado e removido do banco de dados.");
            }
        }

        user = await User.create({ name: normalizedUserName });
        res.status(201).json(user);
    } catch (error) {
        res.status(500).json("Erro ao salvar o usuário: " + error.message);
    }
};

exports.getUsers = async (req, res) => {
    try {
        const users = await User.findAll({ where: { active: true } });
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json("Erro ao buscar usuários: " + error.message);
    }
};

exports.getRemovedUsers = async (req, res) => {
    try {
        const users = await User.findAll({ where: { active: false } });
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json("Erro ao buscar usuários removidos: " + error.message);
    }
};

exports.deleteUser = async (req, res) => {
    try {
        const user = await User.findByPk(req.params.id);
        if (!user) {
            return res.status(404).json("Usuário não encontrado.");
        }

        user.active = false;
        await user.save();
        res.status(204).send();
    } catch (error) {
        res.status(500).json("Erro ao remover usuário: " + error.message);
    }
};
