import {JukeboxMongoClient} from "../jukebox-mongo-client";

export const getAmbientQueueRoute = async (request, response) => {
    const jukeboxMongoClient = new JukeboxMongoClient();
    const ambientQueueCurrent = await jukeboxMongoClient.getAmbientQueueForOwner(request.params.owner);
    response.setHeader('Content-Type', 'application/json');
    console.error(request.params.owner);
    response.end(JSON.stringify({ambientQueue: ambientQueueCurrent, owner: request.params.owner}));
};