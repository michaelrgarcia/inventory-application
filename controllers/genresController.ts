import { Request, Response } from "express";

export function genresGet(req: Request, res: Response) {
  res.render("genres");
}
