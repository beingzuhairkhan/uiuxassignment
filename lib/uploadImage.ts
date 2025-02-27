import { ID , storage } from '../appwrite'

const uploadImage = async (file : File)=>{
    if(!file) return ;
    const fileUploaded = await storage.createFile(
        "67a773fb0029dfbb9c61",
        ID.unique(),
        file
    );
    return fileUploaded;
}


export default uploadImage