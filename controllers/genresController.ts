import { Request, Response } from "express";
import { body, validationResult } from "express-validator";

import {
  getAlbumArtist,
  getAlbumsByGenre,
  getArtistsByGenre,
  getGenreById,
  getGenres,
} from "../db/queries.js";

export async function genresGet(req: Request, res: Response) {
  const genres = await getGenres();

  res.render("genres", { genres: genres });
}

export function addGenreGet(req: Request, res: Response) {
  res.render("addGenre");
}

const validateGenre = [
  body("genreName")
    .trim()
    .escape()
    .isLength({ max: 50 })
    .withMessage(`Genre name cannot be longer than 50 characters.`),
  body("genreDescription")
    .optional({ checkFalsy: true })
    .trim()
    .escape()
    .isLength({ max: 500 })
    .withMessage(`Genre description cannot be longer than 500 characters.`),
];

export const addGenrePost = [
  validateGenre,
  (req: Request, res: Response) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).render("addGenre", {
        errors: errors.array(),
      });
    }

    const { genreName, genreDescription } = req.body;

    console.log(genreName, genreDescription);

    // insert genre query

    res.status(200).redirect("/genres");
  },
];

export async function genrePageGet(req: Request, res: Response) {
  const { genreId } = req.params;

  const genre = await getGenreById(Number(genreId));
  const genreArtists = await getArtistsByGenre(Number(genreId));
  const genreAlbums = await getAlbumsByGenre(Number(genreId));

  res.render("genre", {
    genre: genre,
    genreArtists: genreArtists,
    genreAlbums: genreAlbums,
  });
}
