module.exports = app => {
  const devs = require("../controllers/dev.controller.js");

  var router = require("express").Router();

  // Create a new dev
  router.post("/", devs.create);

  // Retrieve all devs
  router.get("/", devs.findAll);

  // Retrieve all published devs
  router.get("/published", devs.findAllPublished);

  // Retrieve a single dev with id
  router.get("/:id", devs.findOne);

  // Update a dev with id
  router.put("/:id", devs.update);

  // Delete a dev with id
  router.delete("/:id", devs.delete);

  // Create a new dev
  router.delete("/", devs.deleteAll);

  app.use("/developers", router);
};
