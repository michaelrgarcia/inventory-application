import { Router } from "express";
import {
  addArtistGet,
  addArtistPost,
  artistPageGet,
  artistsGet,
  deleteArtistGet,
  deleteArtistPost,
  editArtistGet,
  editArtistPost,
} from "../controllers/artistsController.js";

const artistsRouter = Router();

artistsRouter.get("/", artistsGet);

artistsRouter.get("/new", addArtistGet);
// "as any" due to error in express types module
artistsRouter.post("/new", addArtistPost as any);

artistsRouter.get("/:artistId", artistPageGet);

artistsRouter.get("/edit/:artistId", editArtistGet);
artistsRouter.post("/edit/:artistId", editArtistPost as any);

artistsRouter.get("/delete/:artistId", deleteArtistGet);
artistsRouter.post("/delete/:artistId", deleteArtistPost);

export default artistsRouter;
