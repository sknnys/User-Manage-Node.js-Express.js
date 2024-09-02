const express = require('express');
const { createUser, getUsers, getRemovedUsers, deleteUser } = require('../controllers/userController');

const router = express.Router();

module.exports = (supabase) => {
    router.post('/users', (req, res) => createUser(req, res, supabase));
    router.get('/users', (req, res) => getUsers(req, res, supabase));
    router.get('/users/removed', (req, res) => getRemovedUsers(req, res, supabase));
    router.delete('/users/:id', (req, res) => deleteUser(req, res, supabase));
    return router;
};
