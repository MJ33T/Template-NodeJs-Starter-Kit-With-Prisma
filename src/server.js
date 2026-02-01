import dotenv from "dotenv";
import httpServer from "./config/http.js";

dotenv.config();

const PORT = process.env.PORT || 5000;

httpServer.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
