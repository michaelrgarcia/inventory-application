import pool from "./pool.js";

export async function addGenre(name: string, description: string) {
  await pool.query("INSERT INTO genres (name, description) VALUES ($1, $2)", [
    name,
    description,
  ]);
}

export async function getGenres() {
  const { rows } = await pool.query("SELECT * FROM genres");

  return rows;
}

export async function getGenreById(genreId: number) {
  const { rows } = await pool.query("SELECT * FROM genres WHERE id = $1", [
    genreId,
  ]);

  return rows[0];
}

export async function getArtistGenre(artistId: number) {
  const { rows } = await pool.query(
    "SELECT genres.name, genres.id FROM genres JOIN artist_genres ON (artist_genres.genre_id=genres.id) JOIN artists ON (artists.id=artist_genres.artist_id) WHERE artists.id = $1",
    [artistId]
  );

  return rows[0];
}

export async function getAlbumGenre(albumId: number) {
  const { rows } = await pool.query(
    "SELECT genres.name, genres.id FROM genres JOIN album_genres ON (album_genres.genre_id=genres.id) JOIN albums ON (albums.id=album_genres.album_id) WHERE albums.id = $1",
    [albumId]
  );

  return rows[0];
}

export async function deleteGenre(genreId: number) {
  await pool.query("DELETE FROM genres WHERE genres.id = $1", [genreId]);
}

export async function updateGenre(
  name: string,
  description: string,
  genreId: number
) {
  await pool.query(
    "UPDATE genres SET name = $1, description = $2 WHERE id = $3",
    [name, description, genreId]
  );
}

export async function addArtist(
  name: string,
  description: string,
  imgUrl: string,
  genre: string
) {
  await pool.query(
    "INSERT INTO artists (name, description, image) VALUES ($1, $2, $3)",
    [name, description, imgUrl]
  );

  await pool.query(
    "INSERT INTO artist_genres (artist_id, genre_id) SELECT artists.id, genres.id FROM artists, genres WHERE artists.name = $1 AND genres.name = $2",
    [name, genre]
  );
}

export async function getArtists() {
  const { rows } = await pool.query("SELECT * FROM artists");

  return rows;
}

export async function getArtistsByGenre(genreId: number) {
  const { rows } = await pool.query(
    "SELECT artists.name, artists.image, artists.id FROM artists JOIN artist_genres ON (artists.id=artist_genres.artist_id) JOIN genres ON (genres.id=artist_genres.genre_id) WHERE genres.id = $1",
    [genreId]
  );

  return rows;
}

export async function getSameGenreArtists(artistId: number) {
  const { rows } = await pool.query(
    "SELECT artists.name, artists.image, artists.id FROM artists JOIN artist_genres ON (artists.id=artist_genres.artist_id) JOIN genres ON (genres.id=artist_genres.genre_id) WHERE artists.id = $1 AND artists.id != artist_genres.artist_id;",
    [artistId]
  );

  return rows;
}

export async function getArtistById(artistId: number) {
  const { rows } = await pool.query("SELECT * FROM artists WHERE id = $1", [
    artistId,
  ]);

  return rows[0];
}

export async function updateArtist(
  name: string,
  description: string,
  imgUrl: string,
  genre: string,
  artistId: number
) {
  await pool.query(
    "UPDATE artists SET name = $1, description = $2, image = $3 WHERE id = $4",
    [name, description, imgUrl, artistId]
  );

  await pool.query(
    "UPDATE artist_genres SET genre_id = (SELECT id FROM genres WHERE name = $1) WHERE artist_id = $2",
    [genre, artistId]
  );
}

export async function deleteArtist(artistId: number) {
  await pool.query("DELETE FROM artists WHERE artists.id = $1", [artistId]);
}

export async function addAlbum(
  album: string,
  yr: number,
  description: string,
  coverUrl: string,
  artist: string,
  genre: string
) {
  await pool.query(
    "INSERT INTO albums (album, yr, description, cover) VALUES ($1, $2, $3, $4)",
    [album, yr, description, coverUrl]
  );

  await pool.query(
    "INSERT INTO album_artists (album_id, artist_id) SELECT albums.id, artists.id FROM albums, artists WHERE albums.album = $1 AND artists.name = $2",
    [album, artist]
  );

  await pool.query(
    "INSERT INTO album_genres (album_id, genre_id) SELECT albums.id, genres.id FROM albums, genres WHERE albums.album = $1 AND genres.name = $2",
    [album, genre]
  );
}

export async function getAlbums() {
  const { rows } = await pool.query("SELECT * FROM albums");

  return rows;
}

export async function getAlbumsByGenre(genreId: number) {
  const { rows } = await pool.query(
    "SELECT albums.album, albums.cover, albums.id, albums.yr FROM albums JOIN album_genres ON (albums.id=album_genres.album_id) JOIN genres ON (genres.id=album_genres.genre_id) WHERE genres.id = $1",
    [genreId]
  );

  return rows;
}

export async function getDiscography(artistId: number) {
  const { rows } = await pool.query(
    "SELECT albums.album, albums.cover, albums.id FROM albums JOIN album_artists ON (albums.id=album_artists.album_id) JOIN artists ON (artists.id=album_artists.artist_id) WHERE artists.id = $1",
    [artistId]
  );

  return rows;
}

export async function getAlbumById(albumId: number) {
  const { rows } = await pool.query("SELECT * FROM albums WHERE id = $1", [
    albumId,
  ]);

  return rows[0];
}

export async function getAlbumArtist(albumId: number) {
  const { rows } = await pool.query(
    "SELECT artists.name, artists.id FROM artists JOIN album_artists ON (artists.id=album_artists.artist_id) JOIN albums ON (albums.id=album_artists.album_id) WHERE albums.id = $1;",
    [albumId]
  );

  return rows[0];
}

export async function updateAlbum(
  album: string,
  yr: number,
  description: string,
  coverUrl: string,
  artist: string,
  genre: string,
  albumId: number
) {
  await pool.query(
    "UPDATE albums SET album = $1, yr = $2, description = $3, cover = $4 WHERE id = $5",
    [album, yr, description, coverUrl, albumId]
  );

  await pool.query(
    "UPDATE album_artists SET artist_id = (SELECT id FROM artists WHERE name = $1) WHERE album_id = $2",
    [artist, albumId]
  );

  await pool.query(
    "UPDATE album_genres SET genre_id = (SELECT id FROM genres WHERE name = $1) WHERE album_id = $2",
    [genre, albumId]
  );
}

export async function deleteAlbum(albumId: number) {
  await pool.query("DELETE FROM albums WHERE albums.id = $1", [albumId]);
}
