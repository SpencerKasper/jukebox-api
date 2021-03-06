import express from "express";
import {defaultRoute} from "./routes/helloWorldService";
import {updateAmbientQueueRoute} from "./routes/update-ambient-queue-service";
import bodyParser from "body-parser";
import cors from 'cors';
import {getAmbientQueueRoute} from "./routes/get-ambient-queue-route";
import dotenv from 'dotenv';
dotenv.config();

const PORT = 42069;
const app = express();
app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.get('/', defaultRoute);
app.post('/updateAmbientQueue', updateAmbientQueueRoute);
app.get('/getAmbientQueue/:owner', getAmbientQueueRoute);

app.listen(PORT, () => {
    console.log(`Hello world at http://localhost:${PORT}!`)
});