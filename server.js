const express = require('express');
const mongoose = require('mongoose');
const userRoutes = require('./src/routes/userRoutes');
const path = require('path');
const app = express();

// Configuração do middleware
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Conexão com o MongoDB
mongoose.connect('mongodb://localhost:27017/user-management', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// Rotas
app.use('/api/users', userRoutes);

// Rota para arquivos estáticos
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Inicialização do servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
