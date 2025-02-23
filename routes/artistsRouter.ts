import { Router } from "express";
import {
  addArtistGet,
  addArtistPost,
  artistsGet,
} from "../controllers/artistsController.js";

const artistsRouter = Router();

artistsRouter.get("/", artistsGet);

artistsRouter.get("/new", addArtistGet);
// "as any" due to error in express types module
artistsRouter.post("/new", addArtistPost as any);

export default artistsRouter;
