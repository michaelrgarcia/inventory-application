import { Request, Response } from "express";
import { body, validationResult } from "express-validator";

export function artistsGet(req: Request, res: Response) {
  res.render("artists");
}

export function addArtistGet(req: Request, res: Response) {
  res.render("addArtist");
}

export const validateArtist = [
  body("artistName")
    .trim()
    .isLength({ max: 90 })
    .withMessage(`Artist name cannot be longer than 90 characters.`),
  body("artistDescription")
    .optional({ checkFalsy: true })
    .trim()
    .isLength({ max: 500 })
    .withMessage(`Artist description cannot be longer than 500 characters.`),
  body("artistImage")
    .optional({ checkFalsy: true })
    .trim()
    .isURL()
    .withMessage(`Entered URL is invalid.`),
];

export const addArtistPost = [
  validateArtist,
  (req: Request, res: Response) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).render("addArtist", {
        errors: errors.array(),
      });
    }

    const { artistName, artistGenre, artistDescription, artistImage } =
      req.body;

    console.log(artistName, artistGenre, artistDescription, artistImage);

    // insert artist query. use a placeholder image if no artistImage is entered

    res.status(200).redirect("/artists");
  },
];
