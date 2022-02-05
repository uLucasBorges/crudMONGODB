const mongoose = require("mongoose");
const express = require("express");
const Item = require("./models/Item");
const { find } = require("./models/Item");

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

app.get("/itens", async (req, res) => {
  const itens = await Item.find();

  if (itens.length === 0) {
    return res.status(404).send({ message: "Não existe itens cadastrados." });
  }

  res.send(itens.filter(Boolean));
});

//GET BY ID

app.get("/item/:id", async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(400).send({ message: "digite um id válido e tente novamente." });
    return;
  }

  const item = await Item.findById(id);

if(!item){
  return res.status(404).send({message : "item não encontrado."})
}

  res.send(item);
});

// POST - CREATE
app.post("/item", async (req, res) => {
  const { nome, armazenamento, categoria, preço, qntdEstoque } = req.body;

  if (!nome || !armazenamento || !categoria || !preço || !qntdEstoque) {
    res.status(400).send({
      message: "Você não enviou todos os dados corretamente.. atente - se",
    });
    return;
  }

  const item = await new Item({
    nome,
    armazenamento,
    categoria,
    preço,
    qntdEstoque,
  });

  await item.save();

  res.send({ message: "ITEM ADICIONADO COM SUCESSO !!!" });
});

//PUT - UPDATE

app.put("/put/:id", async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(400).send({ message: "digite um id válido e tente novamente." });
    return;
  }

  const item = await Item.findById(id);

if(!item){
  return res.status(404).send({message : "item não encontrado."})
}

const {nome , preço , armazenamento ,categoria , qntdEstoque}  = req.body

if (!nome || !armazenamento || !categoria || !preço || !qntdEstoque) {
  res.status(400).send({
    message: "Você não enviou todos os dados necessários para a atualização.",
  });
  return;
}

item.nome = nome
item.preço = preço
item.armazenamento = armazenamento
item.categoria = categoria
item.qntdEstoque = qntdEstoque

await item.save()


  res.send({message : `Item atualizado com sucesso ! ${item} `})
});

//DELETE

app.delete("/item/:id", async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(400).send({ message: "digite um id válido e tente novamente." });
    return;
  }

const item = await Item.findById(id)

await item.remove()


  res.send({ message: "ITEM DELETADO COM SUCESSO !!!" });
});

app.listen(3000, () => {
  console.log("O seu servidor está rodando em : http://localhost:3000");
});
