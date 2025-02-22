import { Router } from "express";
import { albumsGet } from "../controllers/albumsController.js";

const albumsRouter = Router();

albumsRouter.use("/", albumsGet);

export default albumsRouter;
