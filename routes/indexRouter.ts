import { Router, Request, Response } from "express";
import { genresGet } from "../controllers/indexController.js";

const indexRouter = Router();

indexRouter.get("/", genresGet);

export default indexRouter;
