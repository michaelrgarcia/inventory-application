import { Router } from "express";
import { addGenreGet, genresGet } from "../controllers/genresController.js";

const genresRouter = Router();

genresRouter.get("/", genresGet);
genresRouter.get("/new", addGenreGet);

export default genresRouter;
