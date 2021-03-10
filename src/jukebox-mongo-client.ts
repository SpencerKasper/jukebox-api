import mongodb from 'mongodb';

export class JukeboxMongoClient {
    private client: mongodb.MongoClient;
    private readonly connectionString: string;

    constructor() {
        this.connectionString = process.env.MONGO_CONNECTION_STRING;
        this.client = new mongodb.MongoClient(this.connectionString, {useNewUrlParser: true, useUnifiedTopology: true});
    }

    async getAmbientQueueForOwner(owner) {
        return await this.client.connect()
            .then(async err => {
                const collection = this.client.db("jukebox").collection("ambient_queue");
                const data = await collection.find({_id: {owner}}).toArray();
                return data[0] ? data[0].ambientQueue : [];
            });
    }

    async playNextSongOnAmbientQueue(owner) {
        return await this.client.connect()
            .then(async err => {
                const collection = this.client.db('jukebox').collection('ambient_queue');
                const data = await collection.find({_id: {owner}}).toArray();
                const ambientQueue = data[0] ? data[0].ambientQueue : [];
                const updatedTrackToPlay = ambientQueue.shift();
                const updatedAmbientQueue = {owner, ambientQueue, currentPlayingTrackUri: updatedTrackToPlay};
                this.updateAmbientQueue(updatedAmbientQueue)
                return updatedAmbientQueue;
            });
    }

    updateAmbientQueue(data) {
        this.client.connect(async err => {
            const collection = this.client.db("jukebox").collection("ambient_queue");
            const owner = data.owner;
            const currentPlayingTrackUri = data.currentPlayingTrackUri;
            await collection.updateOne({_id: {owner}}, {
                $set: {
                    owner,
                    ambientQueue: data.ambientQueue,
                    currentPlayingTrackUri,
                }
            }, {upsert: true});
            await this.client.close();
        });
    }

    clearAmbientQueue(data) {
        this.client.connect(async err => {
            const collection = this.client.db("jukebox").collection("ambient_queue");
            const owner = data.owner;
            await collection.updateOne({_id: {owner}}, {
                $set: {
                    ambientQueue: [],
                    currentPlayingTrackUri: '',
                    owner,
                }
            }, {upsert: true});
            await this.client.close();
        });
    }
}