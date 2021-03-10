import {JukeboxMongoClient} from "../jukebox-mongo-client";

export const getAmbientQueueRoute = async (request, response) => {
    const jukeboxMongoClient = new JukeboxMongoClient();
    const ambientQueueCurrent = await jukeboxMongoClient.getAmbientQueueForOwner(request.params.owner);
    response.setHeader('Content-Type', 'application/json');
    response.end(JSON.stringify({ambientQueue: ambientQueueCurrent, owner: request.params.owner}));
};

export const playNextSongOnAmbientQueue = async (request, response) => {
    const jukeboxMongoClient = new JukeboxMongoClient();
    const {owner} = request.params;
    const ambientQueueUpdates = await jukeboxMongoClient.playNextSongOnAmbientQueue(owner);
    response.setHeader('Content-Type', 'application/json');
    response.end(JSON.stringify({...ambientQueueUpdates, owner}));
}

export const clearAmbientQueueRoute = async (request, response) => {
    const jukeboxMongoClient = new JukeboxMongoClient();
    const {owner} = request.body;
    await jukeboxMongoClient.clearAmbientQueue({owner});
    response.setHeader('Content-Type', 'application/json');
    response.end(JSON.stringify({message: `Cleared for ${owner}`}));
}