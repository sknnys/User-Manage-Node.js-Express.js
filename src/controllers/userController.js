const UserService = require('../services/userService');
const AuthService = require('../services/authService');

exports.createUser = async (req, res) => {
    try {
        const user = req.body;
        const result = await UserService.saveUser(user);
        res.status(result.status).json(result.message);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getUsers = async (req, res) => {
    try {
        const users = await UserService.getAllUsers();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getRemovedUsers = async (req, res) => {
    try {
        const removedUsers = await UserService.getRemovedUsers();
        res.status(200).json(removedUsers);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.deleteUser = async (req, res) => {
    try {
        const userId = req.params.id;
        const result = await UserService.deleteUserById(userId);
        res.status(result.status).json(result.message);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.loginUser = async (req, res) => {
    try {
        const { name } = req.body;
        const result = await AuthService.authenticateUser(name);
        res.status(result.status).json(result.message);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
