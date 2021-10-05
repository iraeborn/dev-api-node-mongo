module.exports = mongoose => {
  var schema = mongoose.Schema(
    {
      nome: String,
      sexo: String,
      idade: Number,
      hobby: String,
      datanascimento: Date
    },
    { timestamps: true }
  );

  /*
  {
    "nome": "Iraê Bornholdt",
    "sexo": "Masculino",
    "idade": 37,
    "hobby": "Developer",
    "datanascimento": 05/12/1983
  }
  */

  schema.method("toJSON", function() {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });

  const Dev = mongoose.model("desenvolvedores", schema);
  return Dev;
};
