import { Router } from "express";
import { artistsGet } from "../controllers/artistsController.js";

const artistsRouter = Router();

artistsRouter.use("/", artistsGet);

export default artistsRouter;
