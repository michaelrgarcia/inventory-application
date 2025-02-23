import { Router } from "express";
import {
  addGenreGet,
  addGenrePost,
  genresGet,
} from "../controllers/genresController.js";

const genresRouter = Router();

genresRouter.get("/", genresGet);

genresRouter.get("/new", addGenreGet);
// "as any" due to error in express types module
genresRouter.post("/new", addGenrePost as any);

export default genresRouter;
