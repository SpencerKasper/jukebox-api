import express from "express";
import {defaultRoute} from "./routes/helloWorldService";
import {updateAmbientQueueRoute} from "./routes/update-ambient-queue-service";
import bodyParser from "body-parser";
import cors from 'cors';
import {
    clearAmbientQueueRoute,
    getAmbientQueueRoute,
    playNextSongOnAmbientQueue
} from "./routes/get-ambient-queue-route";
import dotenv from 'dotenv';
dotenv.config();

const PORT = 42069;
const app = express();
app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.get('/', defaultRoute);
app.post('/ambientQueue/update', updateAmbientQueueRoute);
app.post('/ambientQueue/clear', clearAmbientQueueRoute)
app.get('/ambientQueue/:owner', getAmbientQueueRoute);
app.post('/ambientQueue/nextSong/:owner', playNextSongOnAmbientQueue)

app.listen(PORT, () => {
    console.log(`Hello world at http://localhost:${PORT}!`)
});