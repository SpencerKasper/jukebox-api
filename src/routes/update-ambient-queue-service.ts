import {JukeboxMongoClient} from "../jukebox-mongo-client";

export const updateAmbientQueueRoute = async (request, response) => {
    const jukeboxMongoClient = new JukeboxMongoClient();
    const ambientQueueCurrent = await jukeboxMongoClient.getAmbientQueueForOwner(request.body.owner);
    const updatedQueue = [...ambientQueueCurrent, ...request.body.ambientQueue];
    await jukeboxMongoClient
        .updateAmbientQueue({
            ambientQueue: updatedQueue,
            owner: request.body.owner,
            currentPlayingTrackUri: request.body.currentPlayingTrackUri,
        });
    response.setHeader('Content-Type', 'application/json');
    response.end(JSON.stringify({updatedAmbientQueue: updatedQueue}));
};