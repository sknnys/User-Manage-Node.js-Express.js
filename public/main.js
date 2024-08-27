let authToken = ''; // Token de autenticação
let removedUsers = []; // Array para armazenar os usuários removidos
let removingUserIds = new Set(); // Conjunto para rastrear IDs de usuários que estão sendo removidos

// Função para realizar login
async function login() {
    console.log('Attempting login');
    const name = document.getElementById('login-name')?.value.trim();
    if (!name) {
        console.error('Nome de login não fornecido');
        return;
    }

    try {
        const response = await fetch('/api/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name })
        });

        if (response.ok) {
            const data = await response.json();
            authToken = data.token; // Armazena o token
            document.getElementById('login-form')?.reset(); // Reseta o formulário de login
            fetchUsers(); // Atualiza a lista de usuários
            fetchRemovedUsers(); // Atualiza a lista de removidos
            alert('Login bem-sucedido!');
        } else {
            const errorData = await response.json();
            alert('Erro de autenticação: ' + errorData.message);
            console.error('Erro de autenticação:', errorData.message);
        }
    } catch (error) {
        console.error('Erro ao fazer login:', error);
    }
}

// Função para buscar usuários
async function fetchUsers() {
    console.log('Fetching users');
    try {
        const response = await fetch('/api/users', {
            headers: { 'Authorization': `Bearer ${authToken}` }
        });
        if (!response.ok) throw new Error('Failed to fetch users');
        const users = await response.json();
        const list = document.getElementById('user-list');
        list.innerHTML = '';
        users.forEach(user => {
            const listItem = document.createElement('li');
            listItem.className = 'list-group-item d-flex justify-content-between align-items-center';
            listItem.dataset.id = user.id; // Adiciona o id como atributo data
            listItem.innerHTML = `
                <span>${user.name}</span>
                <button class="btn btn-danger btn-sm ml-3" onclick="removeUser(${user.id})" ${removingUserIds.has(user.id) ? 'disabled' : ''}>
                    <i class="fas fa-trash-alt"></i>
                </button>
            `;
            list.appendChild(listItem);
        });
    } catch (error) {
        console.error('Error fetching users:', error);
    }
}

// Função para buscar usuários removidos
async function fetchRemovedUsers() {
    console.log('Fetching removed users');
    try {
        const response = await fetch('/api/users/removed', {
            headers: { 'Authorization': `Bearer ${authToken}` }
        });
        if (!response.ok) throw new Error('Failed to fetch removed users');
        removedUsers = await response.json();
        updateRemovedUsersList(); // Atualiza a lista de removidos
    } catch (error) {
        console.error('Error fetching removed users:', error);
    }
}

// Função para adicionar usuário
async function addUser() {
    console.log('Adding user');
    const name = document.getElementById('login-name')?.value.trim();
    if (!name) {
        console.error('Nome do usuário não fornecido');
        return;
    }

    try {
        const response = await fetch('/api/users', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${authToken}`
            },
            body: JSON.stringify({ name })
        });
        const message = await response.text();
        if (response.ok) {
            document.getElementById('login-name')?.value = '';
            fetchUsers(); // Atualiza a lista de usuários
        } else {
            alert(message); // Exibe a mensagem de erro recebida
            console.error('Erro ao adicionar usuário:', message);
        }
    } catch (error) {
        console.error('Error adding user:', error);
    }
}

// Função para remover usuário
async function removeUser(userId) {
    if (removingUserIds.has(userId)) return; // Não faz nada se o usuário já está sendo removido

    removingUserIds.add(userId); // Marca o usuário como removido
    try {
        const response = await fetch(`/api/users/${userId}`, {
            method: 'DELETE',
            headers: { 'Authorization': `Bearer ${authToken}` }
        });
        if (!response.ok) throw new Error('Failed to remove user');

        // Adiciona o usuário removido à lista de removidos
        const userName = document.querySelector(`#user-list li[data-id="${userId}"] span`).textContent;
        removedUsers.push({ id: userId, name: userName });
        updateRemovedUsersList(); // Atualiza a lista de removidos
        
        fetchUsers(); // Atualiza a lista de usuários
    } catch (error) {
        console.error('Error removing user:', error);
    } finally {
        removingUserIds.delete(userId); // Remove a marcação de remoção, independentemente do resultado
    }
}

// Função para atualizar a lista de usuários removidos
function updateRemovedUsersList() {
    console.log('Updating removed users list');
    const removedList = document.getElementById('removed-user-list');
    removedList.innerHTML = '';
    removedUsers.forEach(user => {
        const listItem = document.createElement('li');
        listItem.className = 'list-group-item d-flex justify-content-between align-items-center';
        listItem.innerHTML = `
            <span>${user.name}</span>
        `;
        removedList.appendChild(listItem);
    });
}

// Adiciona ouvintes de eventos quando o DOM estiver pronto
document.addEventListener('DOMContentLoaded', function() {
    // Adiciona um ouvinte de evento para o formulário de login
    const loginForm = document.getElementById('login-form');
    if (loginForm) {
        loginForm.addEventListener('submit', function(event) {
            event.preventDefault(); // Evita o envio padrão do formulário
            login();
        });
    } else {
        console.error('Formulário de login não encontrado');
    }

    // Adiciona um ouvinte de evento para o formulário de adição de usuário
    const userForm = document.getElementById('user-form');
    if (userForm) {
        userForm.addEventListener('submit', function(event) {
            event.preventDefault(); // Evita o envio padrão do formulário
            addUser();
        });
    } else {
        console.error('Formulário de adição de usuário não encontrado');
    }
});
