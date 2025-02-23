import { Router } from "express";
import {
  addAlbumGet,
  addAlbumPost,
  albumsGet,
} from "../controllers/albumsController.js";

const albumsRouter = Router();

albumsRouter.get("/", albumsGet);

albumsRouter.get("/new", addAlbumGet);
// "as any" due to error in express types module
albumsRouter.post("/new", addAlbumPost as any);

export default albumsRouter;
