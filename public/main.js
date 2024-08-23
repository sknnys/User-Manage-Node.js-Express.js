let removedUsers = []; // Array para armazenar os usuários removidos
let removingUserIds = new Set(); // Conjunto para rastrear IDs de usuários que estão sendo removidos

async function fetchUsers() {
    try {
        const response = await fetch('/api/users');
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

async function fetchRemovedUsers() {
    try {
        const response = await fetch('/api/users/removed');
        if (!response.ok) throw new Error('Failed to fetch removed users');
        removedUsers = await response.json();
        updateRemovedUsersList(); // Atualiza a lista de removidos
    } catch (error) {
        console.error('Error fetching removed users:', error);
    }
}

async function addUser() {
    const name = document.getElementById('user-name').value;
    if (!name) return;
    try {
        const response = await fetch('/api/users', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name })
        });
        const message = await response.text();
        if (response.ok) {
            document.getElementById('user-name').value = '';
            fetchUsers(); // Atualiza a lista de usuários
        } else {
            alert(message); // Exibe a mensagem de erro recebida
        }
    } catch (error) {
        console.error('Error adding user:', error);
    }
}

async function removeUser(userId) {
    if (removingUserIds.has(userId)) return; // Não faz nada se o usuário já está sendo removido

    removingUserIds.add(userId); // Marca o usuário como removido
    try {
        const response = await fetch(`/api/users/${userId}`, {
            method: 'DELETE'
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

function updateRemovedUsersList() {
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

window.onload = function() {
    fetchUsers();
    fetchRemovedUsers(); // Busca os removidos ao carregar a página

    // Adiciona um ouvinte de evento para o formulário
    const form = document.getElementById('user-form');
    form.addEventListener('submit', function(event) {
        event.preventDefault(); // Evita o envio padrão do formulário
        addUser();
    });
};
