import express from "express";
import { adminRoutes } from "./adminRoutes.js";
import { appRoutes } from "./appRoutes.js";

const router = express.Router();

const apiRoutes = [
  {
    path: "/admin",
    route: adminRoutes,
  },
  {
    path: "/app",
    route: appRoutes,
  },
];

apiRoutes.forEach((route) => router.use(route.path, route.route));
export default router;
