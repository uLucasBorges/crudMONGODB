const mongoose = require("mongoose");
const itemSchema = new mongoose.Schema({
  nome: {
    type: String,
    require: true,
  },
  armazenamento: {
    type: Number,
    require: true,
  },
  categoria: {
    type: String,
    require: true,
  },
  preço: {
    type: Number,
    require: true,
  },
  qntdEstoque: {
    type: Number,
    require: true,
  },
});

module.exports = mongoose.model("Item", itemSchema);
