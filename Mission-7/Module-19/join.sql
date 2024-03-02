-- Active: 1709038877792@@127.0.0.1@5432@ums@public
SELECT * FROM posts;
SELECT * FROM users;

-- INNER JOIN
SELECT * FROM "posts" as p
  INNER JOIN "users" as u ON u.id = p.user_id;

-- LEFT JOIN
SELECT * FROM "users"
  LEFT JOIN "posts" ON posts.user_id = users.id;
SELECT * FROM "posts"
  LEFT OUTER JOIN "users" ON posts.user_id = users.id;

-- RIGHT JOIN
SELECT * FROM "posts"
  RIGHT JOIN "users" ON users.id = posts.user_id;
SELECT * FROM "users"
  RIGHT OUTER JOIN "posts" ON posts.user_id = users.id;

-- FULL JOIN
SELECT * FROM "posts"
  FULL OUTER JOIN "users" ON posts.user_id = users.id;