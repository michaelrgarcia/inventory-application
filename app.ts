import express, { Request, Response, NextFunction } from "express";

import indexRouter from "./routes/indexRouter.js";
import genresRouter from "./routes/genresRouter.js";
import albumsRouter from "./routes/albumsRouter.js";
import artistsRouter from "./routes/artistsRouter.js";

import { fileURLToPath } from "node:url";
import { join, dirname } from "node:path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const assetsPath = join(__dirname, "public");

const app = express();
const PORT = 3000;

app.use(express.urlencoded({ extended: true }));

app.use("/", indexRouter);
app.use("/genres", genresRouter);
app.use("/albums", albumsRouter);
app.use("/artists", artistsRouter);

app.use(express.static(assetsPath));

app.set("views", join(__dirname, "views"));
app.set("view engine", "ejs");

app.listen(PORT, () => {
  console.log("Listening on port", PORT);
});

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err);

  res.status(500).send(err.message);
});
