import { Request, Response } from "express";
import { body, validationResult } from "express-validator";
import {
  getAlbumArtist,
  getAlbumById,
  getAlbumGenre,
  getAlbums,
} from "../db/queries.js";

export async function albumsGet(req: Request, res: Response) {
  const albums = await getAlbums();

  res.render("albums", { albums: albums });
}

export function addAlbumGet(req: Request, res: Response) {
  res.render("addAlbum");
}

export const validateAlbum = [
  body("albumTitle")
    .trim()
    .isLength({ max: 90 })
    .withMessage(`Album title cannot be longer than 90 characters.`),
  body("releaseDate").toInt(),
  body("albumDescription")
    .optional({ checkFalsy: true })
    .trim()
    .isLength({ max: 500 })
    .withMessage(`Album description cannot be longer than 500 characters.`),
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

    const {
      albumTitle,
      releaseDate,
      albumArtist,
      albumGenre,
      albumDescription,
      albumCover,
    } = req.body;

    console.log(albumArtist);

    // insert album query. use a placeholder image if no albumCover is entered

    res.status(200).redirect("/albums");
  },
];

export async function albumPageGet(req: Request, res: Response) {
  const { albumId } = req.params;

  const album = await getAlbumById(Number(albumId));
  const albumGenre = await getAlbumGenre(Number(albumId));
  const albumArtist = await getAlbumArtist(Number(albumId));

  res.render("album", {
    album: album,
    albumGenre: albumGenre,
    albumArtist: albumArtist,
  });
}
