const jwt = require('jsonwebtoken');
const User = require('../models/User');

exports.authenticateUser = async (name) => {
    const normalizedUserName = name.toLowerCase();
    const user = await User.findOne({ name: normalizedUserName, active: true });

    if (!user) {
        return { status: 401, message: "Usuário não encontrado ou foi removido." };
    }

    const token = jwt.sign({ id: user._id }, 'your_jwt_secret', { expiresIn: '1h' });
    return { status: 200, message: { token } };
};
