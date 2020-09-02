import express from "express";
import {defaultRoute} from "./routes/helloWorldService";

const PORT = 3000;
const app = express();

app.get('/', defaultRoute);

app.listen(PORT, () => {
    console.log(`Hello world at http://localhost:${PORT}!`)
});