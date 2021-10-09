const db = require("../models");
const Dev = db.devs;

///////// Create and Save a new Dev
// exports.create = (req, res) => {
//   // Validate request
//   if (!req.body.nome) {
//     res.status(400).send({ message: "Content can not be empty!" });
//     return;
//   }

//   // Create a Dev
//   const dev = new Dev({
//     nome: req.body.nome,
//     sexo: req.body.sexo,
//     idade: req.body.idade,
//     hobby: req.body.hobby,
//     datanascimento: req.body.datanascimento
//     //published: req.body.published ? req.body.published : false
//   });

//   // Save Dev in the database
//   dev
//     .save(dev)
//     .then(data => {
//       res.send(data);
//     })
//     .catch(err => {
//       res.status(500).send({
//         message:
//           err.message || "Some error occurred while creating the Dev."
//       });
//     });
// };

/////// Retrieve all Devs from the database.
// exports.findAll = (req, res) => {
//   const nome = req.query.nome;
//   var condition = nome ? { nome: { $regex: new RegExp(nome), $options: "i" } } : {};
//   Dev.find(condition)
//     .then(data => {
//       res.send(data);
//     })
//     .catch(err => {
//       res.status(500).send({
//         message:
//           err.message || "Some error occurred while retrieving devs."
//       });
//     });
// };

// Find a single Dev with an id
// exports.findOne = (req, res) => {
//   const id = req.params.id;

//   Dev.findById(id)
//     .then(data => {
//       if (!data)
//         res.status(404).send({ message: "Not found Dev with id " + id });
//       else res.send(data);
//     })
//     .catch(err => {
//       res
//         .status(500)
//         .send({ message: "Error retrieving Dev with id=" + id });
//     });
    
// };

// Update a Dev by the id in the request
// exports.update = (req, res) => {
//   if (!req.body) {
//     return res.status(400).send({
//       message: "Data to update can not be empty!"
//     });
//   }

//   const id = req.params.id;

//   Dev.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
//     .then(data => {
//       if (!data) {
//         res.status(404).send({
//           message: `Cannot update Dev with id=${id}. Maybe Dev was not found!`
//         });
//       } else res.send({ message: "Dev was updated successfully." });
//     })
//     .catch(err => {
//       res.status(500).send({
//         message: "Error updating Dev with id=" + id
//       });
//     });
// };

// Delete a Dev with the specified id in the request
// exports.delete = (req, res) => {
//   const id = req.params.id;

//   Dev.findByIdAndRemove(id, { useFindAndModify: false })
//     .then(data => {
//       if (!data) {
//         res.status(404).send({
//           message: `Cannot delete Dev with id=${id}. Maybe Dev was not found!`
//         });
//       } else {
//         res.send({
//           message: "Dev was deleted successfully!"
//         });
//       }
//     })
//     .catch(err => {
//       res.status(500).send({
//         message: "Could not delete Dev with id=" + id
//       });
//     });
// };

// Delete all devs from the database.
exports.deleteAll = (req, res) => {
  Dev.deleteMany({})
    .then(data => {
      res.send({
        message: `${data.deletedCount} Dev were deleted successfully!`
      });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all devs."
      });
    });
};

// Find all published devs
exports.findAllPublished = (req, res) => {
  Dev.find({ published: true })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving devs."
      });
    });
};
