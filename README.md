# DESAFIO GARUPA

Desafio garupa back-end feito com Express e Prisma

## API

Para rodar a API local realizar:

```bash

  # Clone este repositório
  $ git clone <https://github.com/fdevos1/backend-nodejs-express-prisma.git>

  # Instale as dependências
  $ npm install

  # Execute a aplicação em modo de desenvolvimento
  $ npm run dev

# O servidor inciará na porta:4000 - acesse <http://localhost:4000>

```

## Endpoints

<!--ts-->

- [Users](#users)
- [Token](#Token)
<!--te-->

## Users

endpoint: /user

### Retornar todos o usuários

- get
- /user/get-users
- Rota autenticada
  Retorno

```ts
[
  {
    name: "Nome Sobrenome",
    email: "fake@mail.com",
    id: 1,
  },
];
```

### Retornar um usuário

- get
- /user/get-user&id=id
- Rota autenticada

  Retorno

```ts
  {
    name: "Nome Sobrenome",
    email: "fake@mail.com",
    id: 1,
  }
```

### Criar usuário

- post
- /user/create-user
- Rota não autenticada

### Código OTP para autenticar usuário (Caso esqueça a senha)

- post
- /user/create-otp
- Rota não autenticada

### Atualizar informação de usuário

- put
- /user/update-user
- Rota autenticada

### Criar nova senha

- put
- /user/reset-password
- Rota não autenticada

### Deletar usuário

- delete
- /user/delete-user
- Rota autenticada

## Token

endpoint: /token

### Criar token de autenticação

- post
- /token/authenticate-user
- Rota para autenticar usuário

Token expira em 3 dias
