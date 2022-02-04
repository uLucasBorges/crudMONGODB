const { APPCENTER } = require("ci-info");
const express = require("express");
const app = express();
const itens = [
  {
    id: 1,
    nome: "Iphoxe XR",
    armazenamento: "4gb ram , 256 gb interno",
    categoria: "Celular",
    preço: "$3500",
    qntdEstoque: 7,
  },
];

app.use(express.json());

//rota
// GET - READ

app.get("/", (req, res) => {
  res.send(itens.filter(Boolean ));
});

// POST - CREATE
app.post("/create", (req, res) => {
  const item = req.body;

  item.id = itens.length + 1;
  itens.push(item);

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
  
  res.send({message : "ITEM DELETADO COM SUCESSO !!!"})
});

app.listen(3000, () => {
  console.log("O seu servidor está rodando em : http://localhost:3000");
});
