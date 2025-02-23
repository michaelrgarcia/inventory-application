import { Request, Response } from "express";

export function genresGet(req: Request, res: Response) {
  res.render("genres");
}

export function addGenreGet(req: Request, res: Response) {
  res.render("add-genre");
}
