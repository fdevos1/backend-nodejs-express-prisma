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

- Espera

```ts
{
  email: "",
  name: "",
  password: ""
},

```

Retorno

```ts
{
	name: "Nome",
	email: "fake@mail.com",
	id: 1,
	createdAt: "2023-10-11T23:13:12.657Z"
}
```

### Código OTP para autenticar usuário (Caso esqueça a senha)

- post
- /user/create-otp
- Rota não autenticada

- Espera

```ts
{
  email: ""
},

```

- Retorno

```ts
{
  message: "Email sent successfully";
}
```

### Atualizar informação de usuário

- put
- /user/update-user
- Rota autenticada

- Espera

```ts
{
  email?: "",
  name?: ""
},

```

Retorno

```ts
{
	updatedAt: "2023-10-13T15:42:09.960Z",
	name: "Nome",
	email: "fake@mail.com"
}

```

### Criar nova senha

- put
- /user/reset-password
- Rota não autenticada

Retorno

```ts
{
	id: 1,
	password: "$2b$08$QwOX6YgJRf.eE.6DeFm39.8qgXaGGRzrOclX.03.WBU1Lxpk7iJ9W",
	updatedAt: "2023-10-13T15:43:02.998Z"
}

```

### Deletar usuário

- delete
- /user/delete-user
- Rota autenticada

Retorno

```ts
{
  message: "User successfully deleted";
}
```

## Token

A autenticação acontece por Bearer Token, ele espera que nas rotas autenticadas tenha no header da requisição o token.

endpoint: /token

### Criar token de autenticação

- post
- /token/authenticate-user
- Rota para autenticar usuário

- Espera

```ts
{
  email: "",
  password: "",
},

```

Retorno

```ts
{
	token: {
		token: "token gerado",
		user: {
			email: "fake@mail.com",
			name: "Nome",
			id: 1
		}
	}
}
```

Token expira em 3 dias
