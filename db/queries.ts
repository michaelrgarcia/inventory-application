import pool from "./pool.js";

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

export async function getAlbums() {
  const { rows } = await pool.query("SELECT * FROM albums");

  return rows;
}

export async function getAlbumsByGenre(genreId: number) {
  const { rows } = await pool.query(
    "SELECT albums.album, albums.cover, albums.id FROM albums JOIN album_genres ON (albums.id=album_genres.album_id) JOIN genres ON (genres.id=album_genres.genre_id) WHERE genres.id = $1",
    [genreId]
  );

  return rows;
}

export async function getAlbumArtist(albumName: string) {
  const { rows } = await pool.query(
    "SELECT name FROM artists JOIN album_artists ON (artists.id=album_artists.artist_id) JOIN albums ON (albums.id=album_artists.album_id) WHERE album = $1;",
    [albumName]
  );

  return rows[0];
}

/*
export async function insertMessage(
  username: string,
  message: string,
  dateAdded: Date
) {
  await pool.query(
    "INSERT INTO messages (username, text, added) VALUES ($1, $2, $3)",
    [username, message, dateAdded.toISOString()]
  );
}
*/
