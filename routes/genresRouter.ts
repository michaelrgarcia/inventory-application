import { Router } from "express";
import { genresGet } from "../controllers/genresController.js";

const genresRouter = Router();

genresRouter.get("/", genresGet);

export default genresRouter;
