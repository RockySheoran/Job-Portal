import multer from "multer"


const storage = multer.memoryStorage();
export const singleUploadFile = multer({ storage }).single("file");