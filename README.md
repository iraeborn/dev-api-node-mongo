# RESTAPI:Developers NodeJs, MongoDb e Docker

# Frontend
UI/UX SPA (single-page application), atendendo o consumo de todos endpoints da API

# Backend
API JSON REST em *Node.js*, utilizando os métodos (​GET​, ​POST​, ​PUT​, ​DELETE​).

# Banco de dados
Base de desenvolvedores em MongoDb com a seguinte estrutura:

```
nome: varchar
sexo: char
idade: integer
hobby: varchar
datanascimento: date
```

# END-POINTS

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

## Docker setup project

### app/config/db.config.js
//use 'mongodb' on Docker
url: "mongodb://mongodb:27017/"
```
mongodb
```
### Executar comando terminal
```
docker-compose up
```

## Project setup localhost

### app/config/db.config.js
//use 'localhost' on localhost
url: "mongodb://localhost:27017/"
```
localhost
```
### Executar comando terminal
```
npm install
```

```
npm start
```
ou
```
node server.js
```
