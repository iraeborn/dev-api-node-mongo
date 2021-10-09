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

###### Retorna todos os desenvolvedores
```
GET /developers
Codes 200
```

###### Retorna os desenvolvedores de acordo com o termo passado via querystring e paginação
```
GET /developers?
Codes 200 / 404
```

###### Retorna os dados de um desenvolvedor
```
GET /developers/{id}
Codes 200 / 404
```

###### Adiciona um novo desenvolvedor
```
POST /developers
Codes 201 / 400
```

###### Atualiza os dados de um desenvolvedor
```
PUT /developers/{id}
Codes 200 / 400
```

###### Apaga o registro de um desenvolvedor
```
DELETE /developers/{id}
Codes 204 / 400
```

# Referências

###### Node-Express Rest API:
1. https://www.bezkoder.com/node-express-mongodb-crud-rest-api/

###### Swagger:
1. https://github.com/brian-childress/node-autogenerate-swagger-documentation

2. https://dev.to/kabartolo/how-to-document-an-express-api-with-swagger-ui-and-jsdoc-50do

###### Docker:
1. https://www.youtube.com/watch?v=BeFT1hcpUPo



## Project Dependencias
npm install swagger-jsdoc swagger-ui-express
npm install -g nodemon ###### [Nodemon](https://www.npmjs.com/package/nodemon)

## Docker setup project
```
docker-compose up
```

## Project setup
```
npm install
```

### Run
```
npm start
```
```
node server.js
```