import pg from "pg";

import { config } from "dotenv";

config();

const SQL = `
CREATE TABLE IF NOT EXISTS genres (
    id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY, 
    name VARCHAR ( 50 ),  
    description VARCHAR ( 500 )
);

CREATE TABLE IF NOT EXISTS artists (
    id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY, 
    name VARCHAR ( 90 ),  
    description VARCHAR ( 500 ),
    image TEXT
);

CREATE TABLE IF NOT EXISTS albums (
    id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY, 
    album VARCHAR ( 125 ), 
    yr INTEGER, 
    description VARCHAR ( 500 ),
    cover TEXT
);

CREATE TABLE IF NOT EXISTS album_artists (
    album_id INTEGER REFERENCES albums(id) ON DELETE CASCADE, 
    artist_id INTEGER REFERENCES artists(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS album_genres (
    album_id INTEGER REFERENCES albums(id) ON DELETE CASCADE, 
    genre_id INTEGER REFERENCES genres(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS artist_genres (
    artist_id INTEGER REFERENCES artists(id) ON DELETE CASCADE, 
    genre_id INTEGER REFERENCES genres(id) ON DELETE CASCADE
);

INSERT INTO genres (name, description)
VALUES
    ('Lo-fi', 'Lo-fi (also typeset as lofi or low-fi; short for low fidelity) is a music or production quality in which elements usually regarded as imperfections in the context of a recording or performance are present, sometimes as a deliberate stylistic choice.'),
    ('Slowcore', 'Slowcore is a subgenre of indie rock characterised by its subdued tempos, minimalist instrumentation, and sombre vocal performances. Slowcores influences are diverse, involving varying other genres, including folk rock, alternative rock, and dream pop.'),
    ('Indie Folk', 'Indie folk (also called alternative folk) is an alternative genre of music that arose in the 1990s among musicians from indie rock scenes influenced by folk music. Indie folk hybridizes the acoustic guitar melodies of traditional folk music with contemporary instrumentation.');

INSERT INTO artists (name, description, image)
VALUES
    ('Elliott Smith', 'Steven Paul Smith (August 6, 1969 - October 21, 2003), known as Elliott Smith, was an American musician and singer-songwriter. He was born in Omaha, Nebraska, raised primarily in Texas, and lived much of his life in Portland, Oregon, where he gained popularity.', 'https://lonesomebeehive.com/wp-content/uploads/2011/05/elliott-smith-umbrella.jpg'),
    ('Red House Painters', 'Red House Painters were an American rock band formed in Atlanta, Georgia in 1988, before relocating to San Francisco, California.[1] They were one of the most prominent acts associated with the slowcore subgenre.', 'https://f4.bcbits.com/img/0007006066_25.jpg');

INSERT INTO albums (album, yr, description, cover)
VALUES
    ('Elliott Smith', 1995, 'Elliott Smith is the second studio album by the American singer-songwriter of the same name. It was recorded from late 1994 to early 1995, and released on July 21, 1995, through Kill Rock Stars, his first album on the label. It was preceded by the single "Needle in the Hay", released in early January 1995.', 'https://www.udiscovermusic.com/wp-content/uploads/2019/07/Elliott-Smith-self-titled-album-cover-820.jpg'),
    ('Red House Painters', 1993, 'Red House Painters is the second album by American band Red House Painters, released on May 24, 1993 by 4AD. The album is often referred to as Rollercoaster or Red House Painters I to distinguish it from the bands second eponymous album, often referred to as Bridge.', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSBVZ2Tg4MN_Kt5XdJhRzmdVt8U6lZ62ssc0Q&s');

INSERT INTO album_artists (album_id, artist_id)
VALUES
    (1, 1),
    (2, 2);

INSERT INTO album_genres (album_id, genre_id)
VALUES
    (1, 1),
    (2, 2);

INSERT INTO artist_genres (artist_id, genre_id)
VALUES
    (1, 3),
    (2, 2);
`;

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
