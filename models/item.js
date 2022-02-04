const mongoose = require("mongoose");
const itemSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true,
  },
  armazenamento: {
    type: Number,
    String,
    require: true,
  },
  categoria: {
    type,
    String,
    require: true,
  },
  preço: {
    type: Number,
    String,
    require: true,
  },
  qntdEstoque: {
    type: Number,
    require: true,
  },
});

module.exports =  mongoose.model("Item")
