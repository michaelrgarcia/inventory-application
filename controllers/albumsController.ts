import { Request, Response } from "express";
import { body, validationResult } from "express-validator";
import {
  addAlbum,
  getAlbumArtist,
  getAlbumById,
  getAlbumGenre,
  getAlbums,
  getArtists,
  getGenres,
} from "../db/queries.js";

export async function albumsGet(req: Request, res: Response) {
  const albums = await getAlbums();

  res.render("albums", { albums: albums });
}

export async function addAlbumGet(req: Request, res: Response) {
  const artists = await getArtists();
  const genres = await getGenres();

  res.render("addAlbum", { artists: artists, genres: genres });
}

export const validateAlbum = [
  body("albumTitle")
    .trim()
    .isLength({ max: 90 })
    .withMessage(`Album title cannot be longer than 90 characters.`),
  body("releaseDate")
    .isInt()
    .withMessage(`Release date must be a number.`)
    .toInt(),
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
  async (req: Request, res: Response) => {
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

    if (albumCover !== "") {
      await addAlbum(
        albumTitle,
        releaseDate,
        albumDescription,
        albumCover,
        albumArtist,
        albumGenre
      );
    } else {
      await addAlbum(
        albumTitle,
        releaseDate,
        albumDescription,
        "https://media.istockphoto.com/id/1147544807/vector/thumbnail-image-vector-graphic.jpg?s=612x612&w=0&k=20&c=rnCKVbdxqkjlcs3xH87-9gocETqpspHFXu5dIGB4wuM=",
        albumArtist,
        albumGenre
      );
    }

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

export async function editAlbumGet(req: Request, res: Response) {
  const { albumId } = req.params;

  const album = await getAlbumById(Number(albumId));
  const albumArtist = await getAlbumArtist(Number(albumId));
  const albumGenre = await getAlbumGenre(Number(albumId));
  const artists = await getArtists();
  const genres = await getGenres();

  res.render("editAlbum", {
    album: album,
    albumArtist: albumArtist,
    albumGenre: albumGenre,
    artists: artists,
    genres: genres,
  });
}
