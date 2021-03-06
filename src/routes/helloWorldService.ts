import {JukeboxMongoClient} from "../jukebox-mongo-client";

export const defaultRoute = (request, response) => {
    response.send('Hello World!')
};