import pg from "pg";

import { config } from "dotenv";

config();

const SQL = `
CREATE TABLE albums (
    id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY, 
    album VARCHAR ( 125 ), 
    yr INTEGER, 
    description VARCHAR ( 255 )
    cover TEXT
);

CREATE TABLE artists (
    id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY, 
    name VARCHAR ( 90 ),  
    description VARCHAR ( 255 )
    image TEXT
);

CREATE TABLE genres (
    id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY, 
    name VARCHAR ( 50 ),  
    description VARCHAR ( 255 )
);

CREATE TABLE album_artists (
    album_id INTEGER REFERENCES albums(id), 
    artist_id INTEGER REFERENCES artists(id)
);

CREATE TABLE album_genres (
    album_id INTEGER REFERENCES albums(id), 
    genre_id INTEGER REFERENCES genres(id)
);

CREATE TABLE artist_genres (
    artist_id INTEGER REFERENCES artists(id), 
    genre_id INTEGER REFERENCES genres(id)
);
`; // add insertions later

async function populateDb() {
  console.log("seeding...");

  const client = new pg.Client({
    connectionString: process.env.DB_CONNECTION_STRING,
  });

  await client.connect();
  await client.query(SQL);
  await client.end();

  console.log("done");
}

populateDb();
