# Blogs API
<!-- Breve comentário sobre o projeto -->
Neste projeto foi **desenvolvido uma API utilizando a arquitetura MSC** para um sistema de gerenciamento de vendas no formato dropshipping.

## 🚀 Habilidades
> Para esse projeto, foi necessário:
<!-- Listar 2 a 3 habilidades desenvolvidas -->
- Desenvolver uma API RESTful de um CRUD (Create, Read, Update e Delete);
- Utilizar a arquitetura MSC (Model, Service, Controller) para organizar o código;
- Criar testes unitários para APIs REST aplicando o conceito de TDD (Test-driven development).

## 🤖 Tecnologias
> Este projeto foi desenvolvido com as seguintes tecnologias:
<!-- Listar 3 a 5 principais tecnologias usadas -->
- Docker
- Node.js
- Express
- Mocha, Chai, Sinon
- MySQL

## 🧑‍💻 Como executar
> Siga os passos para executar o projeto corretamente:
1. **Instale** as dependências:
    1. Rode os serviços node e db com o comando:
    ```
        docker-compose up -d --build
    ```
    2. Use o comando: 
    ```
        docker exec -it blogs_api bash
    ```
    3. Dentro do container, instale as dependências: 
    ```
        npm install
    ```

1. Como **executar** a aplicação:
    1. Dentro do container, crie o banco de dados:
    ```
        npm run restore
    ```
    2. Inicie a aplicação:
    ```
        npm start
    ```

1. Como **testar** a aplicação:
    1. Dentro do container, digite o comando:
    ```
        npm test
    ```
    
## 📧 Contatos
> Caso tenha alguma dúvida sobre o projeto ou verifique algum erro, entre em contato por:
<div align="center" style="display: inline_block">
  <a href="https://www.linkedin.com/in/tiagoprysthon" target="_blank"><img height="28rem" src="https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white"></a> 
  <a href = "mailto:tiagoprysthon14@gmail.com"><img height="28rem" src="https://img.shields.io/badge/Gmail-D14836?style=for-the-badge&logo=gmail&logoColor=white" target="_blank"></a>
</div>
