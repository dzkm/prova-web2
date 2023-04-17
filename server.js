const express = require('express')
const app = express()
const port = 3000
app.use(express.json());


var jsonData = [
    {
        "id": 1,
        "descricao": "Camiseta",
        "preco": 29.99,
        "cores": ["preto", "branco", "cinza"]
    },
    {
        "id": 2,
        "descricao": "Calça Jeans",
        "preco": 79.99,
        "cores": ["azul claro", "azul escuro"]
    },
    {
        "id": 3,
        "descricao": "Tênis Esportivo",
        "preco": 149.99,
        "cores": ["preto", "branco", "cinza", "azul"]
    },
    {
        "id": 4,
        "descricao": "Jaqueta de Couro",
        "preco": 99.99,
        "cores": ["preto", "marrom"]
    }
];

app.get('/', (req, res) => {
    res.status(200).json(jsonData);
});
app.get('/:id', (req, res) => {
    let product = jsonData[req.params.id - 1];
    if (product) {
        res.status(200).json(product);
    } else {
        res.status(404).send("Not found");
    }
});


app.post('/', function (req, res) {
    let nextid = jsonData.sort((a, b) => { a[1] - b[1] }).reverse()[0].id + 1;
    console.log(req.body);
    jsonData.push(new Object({"id": nextid, "descricao": req.body.descricao, "preco": req.body.preco, "cores": req.body.cores}));
    let newProduct = jsonData[nextid-1];
    if(newProduct){
        res.status(200).send(newProduct);
    }else{
        res.status(500).send("Error on inserting data.");
    }
});

app.put('/:id', function (req, res) {
    const { descricao, preco, cores } = req.body;
    let previousProduct = jsonData[req.params.id-1];
    if(!previousProduct){
        res.status(404).send("Product not found.");
        return;
    }
    jsonData[jsonData.indexOf(previousProduct)] = {"id": previousProduct.id, "descricao": descricao, "preco": preco, "cores": cores};
    let newProduct = jsonData[req.params.id-1];
    console.log("Updated product: " + newProduct);
    res.json({"updated": newProduct, "previous": previousProduct});
});

app.delete('/:id', function (req, res) {
    const { id } = req.params;
    let product = jsonData[id-1];
    if(product){
        jsonData.splice(jsonData.indexOf(product), 1);
        res.status(200).json({"deleted": product});
    }else{
        res.status(400).send("Bad request");
    }
});

app.listen(port, () => console.log(`App is running on http://localhost:${port}`));