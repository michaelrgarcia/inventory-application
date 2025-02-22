import { Request, Response } from "express";

export function artistsGet(req: Request, res: Response) {
  res.render("artists");
}
