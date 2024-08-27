const User = require('../models/User');

exports.saveUser = async (user) => {
    const normalizedUserName = user.name.toLowerCase();
    const existingUser = await User.findOne({ name: normalizedUserName });

    if (existingUser) {
        if (existingUser.active) {
            return { status: 400, message: "Usuário já registrado no banco de dados." };
        } else {
            return { status: 400, message: "Usuário já foi cadastrado e removido do banco de dados." };
        }
    }

    try {
        user.name = normalizedUserName;
        const savedUser = await User.create(user);
        return { status: 201, message: savedUser };
    } catch (error) {
        throw new Error("Erro ao salvar o usuário: " + error.message);
    }
};

exports.getAllUsers = async () => {
    return await User.find({ active: true });
};

exports.getRemovedUsers = async () => {
    return await User.find({ active: false });
};

exports.deleteUserById = async (userId) => {
    const user = await User.findById(userId);
    if (user) {
        user.active = false;
        await user.save();
        return { status: 204, message: "Usuário removido com sucesso." };
    } else {
        return { status: 404, message: "Usuário não encontrado." };
    }
};
