import express from "express";

const PORT = 3000;
const app = express();

app.get('/', (request, response) => {
    response.send('Hello World!')
});

app.get('/firstName/:firstName/lastName/:lastName', (request, response) => {
    const {firstName, lastName} = request.params;
    response.send(`Hello ${firstName} ${lastName}`);
});

app.post('/')

app.listen(PORT, () => {
    console.log(`Hello world at http://localhost:${PORT}!`)
});