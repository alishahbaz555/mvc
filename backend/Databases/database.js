import { MongoClient, ServerApiVersion } from "mongodb";
import dotenv from 'dotenv'
dotenv.config();

const uri = process.env.MONGO_URI
const client = new MongoClient(uri, {
    serverApi:{
        version:ServerApiVersion.v1,
        strict:true,
        deprecationErrors:true,
    }
});

const connect = async ()=>{
    try {
        await client.connect();
        client.db('user_profiles').command({ping:1});
        console.log(`Successfully connected to the Data Base!`)
    } catch (error) {
        console.error(`There was an error connecting to DB Error: ${error}`);
    }

}
connect();

export default client;