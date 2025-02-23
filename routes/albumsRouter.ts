import { Router } from "express";
import {
  addAlbumGet,
  addAlbumPost,
  albumPageGet,
  albumsGet,
  editAlbumGet,
} from "../controllers/albumsController.js";

const albumsRouter = Router();

albumsRouter.get("/", albumsGet);

albumsRouter.get("/new", addAlbumGet);
// "as any" due to error in express types module
albumsRouter.post("/new", addAlbumPost as any);

albumsRouter.get("/:albumId", albumPageGet);

albumsRouter.get("/edit/:albumId", editAlbumGet);

export default albumsRouter;
