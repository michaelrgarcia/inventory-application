import { Router } from "express";
import {
  addArtistGet,
  addArtistPost,
  artistPageGet,
  artistsGet,
} from "../controllers/artistsController.js";

const artistsRouter = Router();

artistsRouter.get("/", artistsGet);

artistsRouter.get("/new", addArtistGet);
// "as any" due to error in express types module
artistsRouter.post("/new", addArtistPost as any);

artistsRouter.get("/:artistId", artistPageGet);

export default artistsRouter;
