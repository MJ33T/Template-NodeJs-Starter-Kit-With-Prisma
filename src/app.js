import cors from "cors";
import express from "express";
import passport from "passport";
import "./config/passport.js";
import { formDataParser } from "./middleware/formDataParser.js";
import handleGlobalError from "./middleware/handelGlobalErrors.js";
import { multerUpload } from "./middleware/multerUpload.js";
import router from "./routes/mainRoutes.js";

const expressServer = express();

expressServer.use(cors());
expressServer.use(express.json());
expressServer.use(express.urlencoded({ extended: true }));
expressServer.use(passport.initialize());

expressServer.use(
  multerUpload.fields([
    { name: "image", maxCount: 1 },
    { name: "multipleImage", maxCount: 10 },
  ]),
);

expressServer.use(formDataParser);

//Access File
expressServer.use("/public", express.static("public"));

expressServer.use("/", router);

expressServer.use((req, res, next) => {
  res.status(404).json({
    success: false,
    message: "API endpoint not found",
    status_code: res.statusCode,
    meta: null,
    data: null,
  });
});

expressServer.use(handleGlobalError);

export default expressServer;
