
module.exports = app => {
  const devs = require("../controllers/dev.controller.js");
  
  var router = require("express").Router();

  // Cria um novo registro dev
  router.post("/", devs.create);
  
  /**
   * @swagger
   * /developers:
   *  get:
   *    summary: Retorna todos registros devs
   *    tags:
   *      - desenvolvedores
   *    description: Retorna todos registros devs
   *    produces:
   *      - application/json
   *    responses:
   *      200:
   *        description: Retorna todos registros devs
   *        schema:
   *          $ref: '#/components/schemas/Desenvolvedores'
   */
  // Retorna todos registros devs
  router.get("/", devs.findAll);

  // Retorna um registro Retrieve dev por id
  router.get("/:id", devs.findOne);

  // Atualiza um registro dev por id
  router.put("/:id", devs.update);

  // Deleta um registro dev por id
  router.delete("/:id", devs.delete);

  // Deleta todos registros dev
  router.delete("/", devs.deleteAll);

  app.use("/developers", router);
}
