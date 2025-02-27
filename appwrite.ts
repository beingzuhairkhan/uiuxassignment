import { Client , ID ,Account, Databases , Storage } from 'appwrite';
const client = new Client()
.setEndpoint("https://cloud.appwrite.io/v1")
.setProject("67a464d800069497888a")


const account = new Account(client)
const databases = new Databases(client)
const storage = new Storage(client);

export { client, databases, storage , account , ID} ;