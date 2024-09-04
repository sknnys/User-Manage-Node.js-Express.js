
# User Management System 🎯

Este é um sistema de gerenciamento de usuários construído com Supabase e Express.js. Ele permite adicionar, remover e listar usuários, incluindo usuários removidos.
## Índice 📚

- Visão Geral
- Tecnologias Utilizadas
- Instalação
- Uso
- Rotas da API
- Contribuição
- Licença


## Visão Geral 🧩

Este projeto é uma aplicação web simples que utiliza Supabase para gerenciamento de banco de dados e Express.js para configurar o backend da API. A interface do usuário é desenvolvida com Bootstrap para um design responsivo e moderno.


## Tecnologias Utilizadas 🚀

**Front-end:**
HTML,
CSS (Bootstrap, Font Awesome),
JavaScript (Fetch API)

**Back-end:** 
Node.js,
Express.js,
Supabase,


**Banco de Dados:**
Supabase (PostgreSQL)

## Instalação 🔧

Clone o repositório:

```bash
  git clone https://github.com/seuUser/SeuRepositorio
  cd SEU_REPOSITORIO
```

Instale as dependências:

```bash
  npm install
```

Configure as variáveis de ambiente:
-  Crie um arquivo .env na raiz do projeto com o seguinte conteúdo:

```bash
  SUPABASE_URL=seu-supabase-url
  SUPABASE_KEY=seu-supabase-key
  PORT=3000
```

Inicie o servidor:

```bash
  npm start
```
O servidor estará disponível em http://localhost:3000
# Uso 📖

**Acesse a aplicação web:** Navegue até http://localhost:3000 em seu navegador.

**Adicionar usuário:** Preencha o campo de nome e clique em "ADICIONAR".

**Remover usuário:** Clique no ícone de lixeira ao lado do nome do usuário para removê-lo.

**Visualizar usuários removidos:** A lista de usuários removidos será atualizada automaticamente.

# Rotas da API 🌐

**POST /api/users:** Adiciona um novo usuário.

**GET /api/users:** Retorna a lista de usuários ativos.

**GET /api/users/removed:** Retorna a lista de usuários removidos.


**DELETE /api/users/:id:** Remove um usuário com o ID fornecido.

# Contribuição 🤝

Contribuições são bem-vindas! Se você encontrar problemas ou quiser adicionar novos recursos, sinta-se à vontade para abrir um issue ou enviar um pull request.
## Faça um fork deste repositório.
Crie uma branch para sua modificação:

Para rodar os testes, rode o seguinte comando

```bash
  git checkout -b minha-nova-funcionalidade
```
Faça suas alterações e commite:

```bash
  git commit -am 'Adiciona nova funcionalidade'
```
Envie sua branch para o repositório remoto:

```bash
  git push origin minha-nova-funcionalidade
```
Abra um pull request no GitHub.

## Licença

Licença 📜
Este projeto é licenciado sob a [MIT](https://choosealicense.com/licenses/mit/)


## Suporte

Para suporte, mande um email para hudrsonsilvahs1@gmail.com.

