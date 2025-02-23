import { Request, Response } from "express";
import { body, validationResult } from "express-validator";

export function albumsGet(req: Request, res: Response) {
  res.render("albums");
}

export function addAlbumGet(req: Request, res: Response) {
  res.render("addAlbum");
}

export const validateAlbum = [
  body("albumTitle")
    .trim()
    .isLength({ max: 90 })
    .withMessage(`Album title cannot be longer than 90 characters.`),
  body("albumDescription")
    .optional({ checkFalsy: true })
    .trim()
    .isLength({ max: 255 })
    .withMessage(`Album description cannot be longer than 255 characters.`),
  body("albumCover")
    .optional({ checkFalsy: true })
    .trim()
    .isURL()
    .withMessage(`Entered URL is invalid.`),
];

export const addAlbumPost = [
  validateAlbum,
  (req: Request, res: Response) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).render("addAlbum", {
        errors: errors.array(),
      });
    }

    const { albumTitle, albumDescription, albumCover } = req.body;

    console.log(albumTitle, albumDescription, albumCover);

    // insert album query. use a placeholder image if no albumCover is entered

    res.status(200).redirect("/albums");
  },
];
