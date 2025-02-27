import { ID , storage } from '../appwrite'


const getURL = async (image:any)=>{
    const url = storage.getFilePreview(image.bucketId , image.fileId );
    return url ;
}


export default getURL