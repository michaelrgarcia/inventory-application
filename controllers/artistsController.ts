import { Request, Response } from "express";
import { body, validationResult } from "express-validator";

import {
  addArtist,
  getArtistById,
  getArtistGenre,
  getArtists,
  getDiscography,
  getGenres,
  getSameGenreArtists,
} from "../db/queries.js";

export async function artistsGet(req: Request, res: Response) {
  const artists = await getArtists();

  res.render("artists", { artists: artists });
}

export async function addArtistGet(req: Request, res: Response) {
  const genres = await getGenres();

  res.render("addArtist", { genres: genres });
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
  async (req: Request, res: Response) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).render("addArtist", {
        errors: errors.array(),
      });
    }

    const { artistName, artistGenre, artistDescription, artistImage } =
      req.body;

    if (artistImage !== "") {
      await addArtist(artistName, artistDescription, artistImage, artistGenre);
    } else {
      await addArtist(
        artistName,
        artistDescription,
        "https://media.istockphoto.com/id/1147544807/vector/thumbnail-image-vector-graphic.jpg?s=612x612&w=0&k=20&c=rnCKVbdxqkjlcs3xH87-9gocETqpspHFXu5dIGB4wuM=",
        artistGenre
      );
    }

    res.status(200).redirect("/artists");
  },
];

export async function artistPageGet(req: Request, res: Response) {
  const { artistId } = req.params;

  const artist = await getArtistById(Number(artistId));
  const artistGenre = await getArtistGenre(Number(artistId));
  const discography = await getDiscography(Number(artistId));
  const sameGenreArtists = await getSameGenreArtists(Number(artistId));

  res.render("artist", {
    artist: artist,
    artistGenre: artistGenre,
    discography: discography,
    sameGenreArtists: sameGenreArtists,
  });
}

export async function editArtistGet(req: Request, res: Response) {
  const { artistId } = req.params;

  const artist = await getArtistById(Number(artistId));
  const artistGenre = await getArtistGenre(Number(artistId));
  const genres = await getGenres();

  res.render("editArtist", {
    artist: artist,
    artistGenre: artistGenre,
    genres: genres,
  });
}
