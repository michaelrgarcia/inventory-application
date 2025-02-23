import { Router } from "express";
import {
  addGenreGet,
  addGenrePost,
  editGenreGet,
  genrePageGet,
  genresGet,
} from "../controllers/genresController.js";

const genresRouter = Router();

genresRouter.get("/", genresGet);

genresRouter.get("/new", addGenreGet);
// "as any" due to error in express types module
genresRouter.post("/new", addGenrePost as any);

genresRouter.get("/:genreId", genrePageGet);

genresRouter.get("/edit/:genreId", editGenreGet);

export default genresRouter;
