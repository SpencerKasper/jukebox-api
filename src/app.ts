import express from "express";
import {defaultRoute, withParametersRoute, withQueryRoute} from "./routes/helloWorldService";

const PORT = 3000;
const app = express();

app.get('/', defaultRoute);

app.get('/withParameters/:withParameters', withParametersRoute);

app.get('/withQuery', withQueryRoute);

app.listen(PORT, () => {
    console.log(`Hello world at http://localhost:${PORT}!`)
});