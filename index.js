const { APPCENTER } = require("ci-info");
const mongoose = require("mongoose");
const express = require("express");
const Item = require("./models/Item");

const app = express();

try {
  mongoose.connect(
    "mongodb+srv://root:admin@cluster0.onxa8.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  );
  console.log("BANCO DE DADOS CONECTADO");
} catch (err) {
  console.log(`ERRO AO CONECTAR AO BANCO DE DADOS  ${err}`);
}

app.use(express.json());

//rota
// GET - READ

app.get("/", (req, res) => {
  res.send(itens.filter(Boolean));
});

// POST - CREATE
app.post("/create", async (req, res) => {
  const { nome, armazenamento, categoria, preço, qntdEstoque } = req.body;
  
  if (!nome || !armazenamento || !categoria || !preço || !preço) {
    res.status(400).send({
      message: "Você não enviou todos os dados corretamente.. atente - se", })
    return;
  }

  const item = await new Item ({
    nome,
    armazenamento,
    categoria,
    preço,
    qntdEstoque,
  })

await item.save()

  res.send({ message: "ITEM ADICIONADO COM SUCESSO !!!" });
});

//GET BY ID

app.get("/item/:id", (req, res) => {
  const id = +req.params.id;
  const item = itens.find((c) => c.id === id);

  if (!item) {
    res.status(404).send({ message: "item não encontrado..." });
    return;
  }
  res.send(item);
});

//PUT - UPDATE

app.put("/item/:id", (req, res) => {
  const id = +req.params.id;
  const item = itens.find((c) => c.id === id);

  if (!item) {
    res.status(404).send({ message: "item não encontrado..." });
    return;
  }

  const { nome, armazenamento, categoria, preço, qntdEstoque } = req.body;
  item.nome = nome;
  item.armazenamento = armazenamento;
  item.categoria = categoria;
  item.preço = preço;
  item.qntdEstoque = qntdEstoque;

  res.send(item);
});

//DELETE

app.delete("/item/:id", (req, res) => {
  const id = +req.params.id;
  const item = itens.find((c) => c.id === id);

  if (!item) {
    res.status(404).send({ message: "item não encontrado..." });
    return;
  }

  const indexItem = itens.indexOf(item);
  delete itens[indexItem];

  res.send({ message: "ITEM DELETADO COM SUCESSO !!!" });
});

app.listen(3000, () => {
  console.log("O seu servidor está rodando em : http://localhost:3000");
});
