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
  apis: ['server.js','./routes/*.js']
}

var swaggerSpec = swaggerJsDoc(options);
app.use("/doc", swaggerUI.serve, swaggerUI.setup(swaggerSpec));


var corsOptions = {
  origin: "http://localhost:8081"
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
    console.log("Connected to the database!");
  })
  .catch(err => {
    console.log("Cannot connect to the database!", err);
    process.exit();
  });

const Dev = db.devs;

// entry route
app.get("/", (req, res) => {
  res.send(
    "Olá Developers!<br><a href='/doc'>Clique para acessar a documentação da API</a>"
   );
});

// Retorna todos registros devs
/**
  * @swagger
  * /developers:
  *  get:
  *    summary: Retorna todos registros devs
  *    tags:
  *      - Desenvolvedores
  *    description: Retorna todos registros devs
  *    responses:
  *      '200':
  *        description: OK
 */
 app.get("/developers", (req, res) => {
  const nome = req.query.nome;
  var condition = nome ? { nome: { $regex: new RegExp(nome), $options: "i" } } : {};
  
  Dev.find(condition)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving devs."
      });
    });
  });

// Cria um novo registro dev
app.put("/developers", (req, res) => {
  // Validate request
  if (!req.body.nome) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }

  // Create a Dev
/**
*  @swagger
*  /developers:
*    put:
*      summary: Cria um novo registro dev
*      description: 
*      tags:
*        - Desenvolvedores
*      consumes:
*        - application/json
*      produces:
*        - application/json
*      parameters:
*      - in: "body"
*        name: "body"
*        description: "Dev object"
*        required: true
*        schema:
*          $ref: "#/components/schemas/Desenvolvedores"
*      responses:
*        '200':
*          description: OK
*/
  const dev = new Dev({
    nome: req.body.nome,
    sexo: req.body.sexo,
    idade: req.body.idade,
    hobby: req.body.hobby,
    datanascimento: req.body.datanascimento
    //published: req.body.published ? req.body.published : false
  });

  // Save Dev in the database
  dev
    .save(dev)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.send({
        message:
          err.message || "Some error occurred while creating the Dev."
      });
    });
});

// Routes
//require("./app/routes/dev.routes")(app);

//
//app.use("/developers", app);

// set port, listen for requests
const PORT = process.env.PORT || 3000; //8080
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
