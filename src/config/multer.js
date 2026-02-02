import multer from "multer";

// Store uploaded files in memory (so we can process with sharp)
const storage = multer.memoryStorage();

export const multerUpload = multer({ storage });
