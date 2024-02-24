-- 1. Create database
-- CREATE DATABASE ums;

-- 2. Create table
-- CREATE TABLE "user" (
-- 	person_id SERIAL,
-- 	user_name VARCHAR(20) NOT NULL UNIQUE,
-- 	first_name VARCHAR(50) NOT NULL,
-- 	last_name VARCHAR(50) NOT NULL,
-- 	email VARCHAR(255) UNIQUE,
-- 	age INTEGER CHECK(age >= 0),
-- 	is_active BOOLEAN DEFAULT true,
-- 	dob DATE,
-- 	PRIMARY KEY(person_id, user_name),
-- 	UNIQUE(user_name)
-- );

-- 3. select all
SELECT * FROM person;

-- 4. rename table
-- ALTER TABLE "person" RENAME to "user";

-- 5. drop table
-- DROP TABLE "user";

-- 6. insert row
-- INSERT INTO person (person_id, first_name, last_name, email,age,is_active)
-- VALUES(3, 'Sanji', 'Islam','sanji@gmail.com', 20, true);

