import { Router } from "express";
import {
  addAlbumGet,
  addAlbumPost,
  albumPageGet,
  albumsGet,
  deleteAlbumGet,
  deleteAlbumPost,
  editAlbumGet,
  editAlbumPost,
} from "../controllers/albumsController.js";

const albumsRouter = Router();

albumsRouter.get("/", albumsGet);

albumsRouter.get("/new", addAlbumGet);
// "as any" due to error in express types module
albumsRouter.post("/new", addAlbumPost as any);

albumsRouter.get("/:albumId", albumPageGet);

albumsRouter.get("/edit/:albumId", editAlbumGet);
albumsRouter.post("/edit/:albumId", editAlbumPost as any);

albumsRouter.get("/delete/:albumId", deleteAlbumGet);
albumsRouter.post("/delete/:albumId", deleteAlbumPost);

export default albumsRouter;
