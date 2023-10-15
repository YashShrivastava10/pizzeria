import { MongoClient, ServerApiVersion } from "mongodb";
const url = "mongodb+srv://shrivastavayash10:simplepassword@cluster1.zxsuzyp.mongodb.net/?retryWrites=true&w=majority"
const client = new MongoClient(url, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});
const dbName = 'pizzeria';

async function connectToDB() {
  await client.connect();
  console.log('Connected successfully to server');
  return client.db(dbName);
}

export default connectToDB