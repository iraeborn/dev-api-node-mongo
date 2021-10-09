const express = require("express");
const cors = require("cors");
const swaggerUI =  require("swagger-ui-express");
const swaggerJsDoc = require("swagger-jsdoc");
const app = express();

var swaggerDefinition = {
  openapi: '3.0.0',
  info:{
    title: "Api Desenvolvedores",
    version: "1.0.00",
    description: "API `Desenvolvedores` criada com Swagger baseada em NodeJS and MongoDb",
    contact:{
      name: "Iraê Bornholdt"
    },
    schemes:
    - "https"
    - "http"
  },
  components:{
    schemas: require("./schemas.json")
  }
}

var options = {
  swaggerDefinition: swaggerDefinition,
  apis: ['server.js']
}
var cssOptions = {
  customCss: `
  .topbar-wrapper img {content:url('data:image/png;base64,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'); width:170px; height:auto;}
  .swagger-ui .topbar { background-color: #000000; border-bottom: 20px solid #5dc6d1; }`,
  customSiteTitle: "API:Developers",
  customfavIcon: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIcAAACHCAYAAAA850oKAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAABCxJREFUeNrsneFN20AUgB9V/zedoN6g6QRxJoBOAEwATJAwQWACwgQNE8RMEDMB7gZmgtanvqihOFQKeed75vukEwikyzn68t67nM93ICLDpg3EL0XCYxvo++uWZdN+OW4pk3t+bz8IwBaQA5ADkAOQA5ADkAOQA5ADkAOQA5ADoJVdFt6mvG3umAoLb0BaAeQA5ADkAOQA5ADkAOQAQA5ADngrHx2PfRr59SptgbJpNXKkyySBMawludffyw2BkOOds94Hm2/8LchSNO1Of7qVhZpj/4TN00dNu2naY9NWTTtvWoYc0BZdZirKUsVBDnhBSD8/VJQT5IA2Mk07q3/qFeSAZylnqaIMkAPaONEoMkQO2JZqVinVIsiRHjfakAO2ppkb5IDXBJkiB2xj0mUNwtrKHyppXwNJ4Tmi4dvV9aIecnTA7X9C+FqSvGkjifvF1UDrj2+klTRZr7QGgcZN+9y004if5mEX9Qdy7C7LXD/N40iShPojQw5fFCrJhdjfHTZBDp9caRSpjKe3GXL4pNQoYplmokUP69nKPo7r8HYzb60R5FFsVlpD9LiUCLcfWssx28O0byxpn6nymiAro/6PNI2RVhynmEujvs+oOfwzNQr/mUT45hY57LGKHjly+GduFD0OkYPoQeToOQuPqQU54k1tF8gB27g36PMrcvSDwmhKixw9wGIZYIgc/RLETfRADuRAjkR4MuhzgBwUpdHrDuQA5EiECjmgF3JY3wk2xgdzRkQOIK0AcgByAHJAl5TI0Q8ygz6fkAM5SCuAHO+V3KDPAjn6wSciB2zDYnmd2QpytFKL4eMpkCOuGPu+a8v0WWTI4bsYRY6ecGzQ5wNy+CczKkYL5PDPiUGflRjfWYYcflPKwnrQyBEnamQG/d4jh2/C1HVm0K/VIx2QIyITsdmRNo8xeOSwIzwr9Nyo72vk8EuYtlqd0VZIpP0vyGEjxlLsNjhfxroQ5NgvubEYhUR81Lf1jrd9TOPm4mMb4VTsTzS4iHlB1nIcy9sXnIrE5ci1vsiMXyc8CL/skxx9ZaCzkTOJc3pkFbPWQI7dIkQQYaRixCQcNlgjRzeM5Pnpi1820kQm3W4puJCOzptBjr9RIU9wXHOJcOgOU1l/FJpOBDlgkzAr+d71IJAjzVQylgQOPUSOtLjqamZCQZoutc5K5ikNCjnSKTyr1AZGWuk2WpyK/RHnRA5nUlxrfZH0SdvIEY8QHW49SIEc8VioFAtvA0cOm7QRisw7FaL2eiHI8XZKbQ8qRdmXC0OO7Z/+sqVm+Lnxv7pPInQhh+WD8Q9w2Ba+5wDkAOQA5ADkAOQA5ADkAOQA5ADkAHjBrmsrYff8KJFrSPlg47C3dpbIWLJYcmTi7Eiqjgi78XPSClBzAHIAIAcgByAHIAcgByAHIAd447cAAwCIBCBC9qzx5QAAAABJRU5ErkJggg=="
};

var swaggerSpec = swaggerJsDoc(options);
app.use("/doc", swaggerUI.serve, swaggerUI.setup(swaggerSpec, cssOptions));


var corsOptions = {
  origin: "http://localhost:3100"
};

app.use(cors(corsOptions));
app.use(express.json()); 
app.use(express.urlencoded({ extended: true }));

const db = require("./app/models");
db.mongoose
  .connect(db.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("Conectado ao banco de dados!");
  })
  .catch(err => {
    console.log("Não é possível conectar ao banco de dados!", err);
    process.exit();
  });

const Dev = db.devs;

// rota de entrada
app.get("/", (req, res) => {
  res.send(
    "Olá Developers!<br><a href='/doc'>Clique para acessar a documentação da API</a>"
   );
});

// Cria um novo registro dev
/**
*  @swagger
*  /developers:
*    post:
*      summary: Adiciona um novo registro dev
*      tags:
*        - Desenvolvedores
*      requestBody:
*        required: true
*        content:
*          application/json:
*            schema:
*              $ref: "#/components/schemas/Desenvolvedores"
*      responses:
*       201:
*         description: Novo dev adicionado com sucesso
*       400:
*         description: Não foi possível adicionar um novo dev
*/
app.post("/developers", (req, res) => {
  // Validate request
  if (!req.body.nome) {
    res.status(400).send({ message: "O conteúdo não pode estar vazio!" });
    return;
  }

  const dev = new Dev({
    nome: req.body.nome,
    sexo: req.body.sexo,
    idade: req.body.idade,
    hobby: req.body.hobby,
    datanascimento: req.body.datanascimento
  });

  res.send(dev);

  // Salvar Dev no banco de dados
  dev
    .save(dev)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.send({
        message:
          err.message || "Ocorreu algum erro ao criar o Dev."
      });
    });
});

// Retorna um único Dev com um id
/**
  * @swagger
  * /developers/{id}:
  *  get:
  *    summary: Retorna um único Dev com um id
  *    tags:
  *      - Desenvolvedores
  *    description: Retorna um único Dev com um id
  *    parameters:
  *      - in: path
  *        name: id
  *        required: true
  *    responses:
  *      '200':
  *        description: OK
  *      '404':
  *        description: Dev não encontrado com id
  */
 app.get("/developers/:id", (req, res) => {
  const id = req.params.id;

Dev.findById(id).then(data => {
      if (!data)
        res.status(404).send({ message: "Dev não encontrado com id " + id });
      else
        res.send(data);
    })
    .catch(err => {
      res.status(404).send({ message: "404" });
    });
    
});

// Retorna os desenvolvedores de acordo com o termo passado via querystring e paginação
/**
  * @swagger
  * /developers:
  *  get:
  *    summary: Retorna dev por Querystring e paginação
  *    tags:
  *      - Desenvolvedores
  *    description: Retorna os desenvolvedores de acordo com o termo passado via querystring e paginação
  *    parameters:
  *      - in: query
  *        name: page
  *        required: false
  *        default: 1
  *      - in: query
  *        name: limit
  *        required: false
  *        default: 2
  *      - in: query
  *        name: id
  *        required: false
  *      - in: query
  *        name: nome
  *        required: false
  *      - in: query
  *        name: sexo
  *        required: false
  *      - in: query
  *        name: idade
  *        required: false
  *      - in: query
  *        name: hobby
  *        required: false
  *      - in: query
  *        name: datanascimento
  *        required: false
  *    responses:
  *      '200':
  *        description: OK
  *        schema:
  *           $ref: "#/components/schemas/Desenvolvedores"
  *      '404':
  *        description: Dev não encontrado com id
  */
 const url = require('url');
 app.get("/developers", (req, res) => {

const page = req.query.page ? parseInt(req.query.page, 10) : 1;
const limit = req.query.limit ? parseInt(req.query.limit, 10) : -1;

const nome = req.query.nome;
const id = req.query.id;
var query = {};
const queryObject = url.parse(req.url, true).query;

for (let [key, value] of Object.entries(queryObject)) {
  if(key == "page" || key == "limit")
  continue
  Object.assign(query, {[key]:value});
}

const startIndex = (page - 1) * limit;
const endIndex = page * limit;

Dev.find(query).then(data => {
      if (!data)
        res.status(404).send({ message: "Dev não encontrado com id " + id });
      else
        datadev = data.slice(startIndex, endIndex);
        res.send(datadev);
    })
    .catch(err => {
      res.status(404).send({ message: "404" });
    });
    
});

// Deleta um registro dev por id
/**
 * @swagger
 * /developers/{id}:
 *  delete:
 *    summary: Deleta um registro dev por id
 *    tags:
 *      - Desenvolvedores
 *    parameters:
 *      - in: path
 *        name: id
 *        required: true
 *    responses:
 *      204:
 *        description: Dev foi deletado
 *      400:
 *        description: O Dev não foi encontrado
 */

 app.delete("/developers/:id", (req, res) => {
  const id = req.params.id;

  Dev.findByIdAndRemove(id, { useFindAndModify: false }).then(data => {
      if (!data) {
        res.status(404).send({
          message: `Não é possível deletar Dev com id=${id}. Talvez Dev não tenha sido encontrado!`
        });
      } else {
        res.send({
          message: "Dev foi excluído com sucesso!"
        });
      }
    }).catch(err => {
      res.status(500).send({
        message: "Não foi possível excluir Dev com id=" + id
      });
    });

});

// Atualiza um registro dev por id
/**
 * @swagger
 * /developers/{id}:
 *  put:
 *    summary: Atualiza dev por id
 *    tags:
 *      - Desenvolvedores
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: Dev id
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: "#/components/schemas/Desenvolvedores"
 *    responses:
 *      200:
 *        description: Dev foi atualizado
 *      400:
 *        description: Dev não encontrado
 */

app.put("/developers/:id", (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Os dados a serem atualizados não podem estar vazios!"
    });
  }

  const id = req.params.id;

  Dev.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Não é possível atualizar Dev com id=${id}. Talvez Dev não tenha sido encontrado!`
        });
      } else res.send({ message: "Dev foi atualizado com sucesso." });
    })
    .catch(err => {
      res.status(500).send({
        message: "Erro ao atualizar Dev com id=" + id
      });
    });
});

// set port, listen for requests
const PORT = process.env.PORT || 3100; //8080
app.listen(PORT, () => {
  console.log(`Servidor está rodando na porta ${PORT}.`);
});
