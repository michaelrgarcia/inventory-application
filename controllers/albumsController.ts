import { Request, Response } from "express";

export function albumsGet(req: Request, res: Response) {
  res.render("albums");
}
