import { MongoClient } from "mongodb";

const mongoURI = process.env.MONGODB_URI;
const client = new MongoClient(mongoURI);

/**
 * Connects the MongoClient to the MongoDB service specified by MONGODB_URI
 * @returns A Promise which resolves to the client object
 */
export function connectToMongo() {
    return client.connect();
};

export function getDb(dbName = process.env.DB_NAME) {
    return client.db(dbName);
};

// These are just used for closing the connection properly
function signalHandler() {
    console.log("Closing MongoDB connection...");
    process.exit();
    client.close();
}

process.on("SIGINT", signalHandler);
process.on("SIGTERM", signalHandler);
process.on("SIGQUIT", signalHandler);