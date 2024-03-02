-- Active: 1709038877792@@127.0.0.1@5432@ums@public

CREATE TABLE "users"(
  id SERIAL PRIMARY KEY,
  username VARCHAR(20)
);

INSERT INTO "users"(username) VALUES
  ('Sabbir'),
  ('Salkin'),
  ('Shafa'),
  ('Sajia'),
  ('Mizan'),
  ('Sohan');

ALTER TABLE "posts"
  alter set user_Id set NOT NULL; 

DROP TABLE "users";

CREATE TABLE "posts"(
  id SERIAL PRIMARY KEY,
  title TEXT,
  user_id INTEGER REFERENCES "users"(id) ON DELETE CASCADE
);

ALTER TABLE "posts"
  alter COLUMN user_Id set NOT NULL; 

INSERT INTO "posts"(title, user_id) VALUES
  ('Enjoying a Sunny day with Salkin', 2),
  ('Sabbir Just shared an amazing recipe', 1),
  ('Exploring adventures with Shafa', 4),
  ('Sohan wisdom always leaves me inspired', 4);

DROP TABLE "posts";

INSERT INTO "posts"(title, user_id) VALUES
  ('testing', NULL);

/*
Deletion constraint on DELETE user
1. restrict deletion: ON DELETE RESTRICT / ON DELETE ON ACTION(default)
2. cascading deletion: ON DELETE CASCADE
3. setting NULL: ON DELETE NULL;
4. set default value: ON DELETE SET DEFAULT
*/
SELECT * FROM posts;
SELECT * FROM users;

DELETE FROM "users"
  WHERE id = 4;

