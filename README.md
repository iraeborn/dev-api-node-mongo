# dev-api-node-mongo

# Backend
API JSON REST em *Node.js*, utilizando os métodos (​GET​, ​POST​, ​PUT​, ​DELETE​).

# Frontend
UI/UX SPA (single-page application), atendendo o consumo de todos endpoints da API

# Especificação
Base de desenvolvedores com a seguinte estrutura:

```
nome: varchar
sexo: char
idade: integer
hobby: varchar
datanascimento: date
```

MongoDb como ​banco de dados​

# API endpoints

```
GET /developers
Codes 200
```
Retorna todos os desenvolvedores

```
GET /developers?
Codes 200 / 404
```
Retorna os desenvolvedores de acordo com o termo passado via querystring e
paginação

```
GET /developers/{id}
Codes 200 / 404
```
Retorna os dados de um desenvolvedor

```
POST /developers
Codes 201 / 400
```
Adiciona um novo desenvolvedor

```
PUT /developers/{id}
Codes 200 / 400
```
Atualiza os dados de um desenvolvedor

```
DELETE /developers/{id}
Codes 204 / 400
```
Apaga o registro de um desenvolvedor

# Referências
Swagger: https://github.com/brian-childress/node-autogenerate-swagger-documentation

## Project Dependencias
npm install swagger-jsdoc swagger-ui-express

## Project setup
```
npm install
```

### Run
```
node server.js
```
