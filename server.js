const express = require("express");
const cors = require("cors");
const swaggerUI =  require("swagger-ui-express");
const swaggerJsDoc = require("swagger-jsdoc");
const app = express();

var swaggerDefinition = {
  openapi: '3.0.0',
  info:{
    title: "Api Dev com swagger",
    version: "1.0.00",
    descriptiom: "Documentação API Desenvolvedores"
  },
  components:{
    schemas: require("./schemas.json")
  }
}

var options = {
  swaggerDefinition: swaggerDefinition,
  apis: ['./routes/*.js']
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

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Olá Developers!" });
});

require("./app/routes/dev.routes")(app);

// set port, listen for requests
const PORT = process.env.PORT || 3000; //8080
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
