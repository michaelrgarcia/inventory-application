import pool from "./pool.js";

/*
export async function getMessageById(msgIndex: number) {
  const { rows } = await pool.query("SELECT * FROM messages WHERE id = $1", [
    msgIndex,
  ]);

  return rows[0];
}

*/

export async function getGenres() {
  const { rows } = await pool.query("SELECT * FROM genres");

  return rows;
}

export async function getArtists() {
  const { rows } = await pool.query("SELECT * FROM artists");

  return rows;
}

export async function getAlbums() {
  const { rows } = await pool.query("SELECT * FROM albums");

  return rows;
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
