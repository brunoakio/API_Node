const express = require("express");

const app = express();

app.use(express.json());

app.post("/leads/:id" , (request, response) => {
    const body = request.body;
    return response.json([]);
})
app.get("/leads/:id" , (request, response) => {
    const { id } = request.params;
    return response.json([]);
});
//Porta da aplicação
app.listen(3333);
