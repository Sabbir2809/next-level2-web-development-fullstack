-- Active: 1709008197463@@127.0.0.1@5432@ums

-- select all data
SELECT * FROM person;

-- add column
ALTER TABLE person
  ADD COLUMN gender VARCHAR(6) DEFAULT 'female' NOT NULL;

-- insert data
INSERT INTO person (person_id, first_name, last_name, email,age,is_active, gender)
  VALUES(4, 'Abu', 'Salkin','abu@gmail.com', 25, true, 'male');


-- create table
CREATE TABLE "user" (
	_id SERIAL,
	user_name VARCHAR(20) NOT NULL,
  age INTEGER,
	UNIQUE(user_name)
);

-- select all data
SELECT * FROM "user";

-- add column
ALTER TABLE "user"
  ADD COLUMN gender VARCHAR(6) DEFAULT 'N/A' NOT NULL;

-- insert data
Insert INTO "user" (_id, user_name, age) VALUES(2, 'Maru', 22);

-- drop column
ALTER TABLE "user"
  DROP COLUMN gender;

-- rename column
ALTER TABLE "user"
  RENAME COLUMN user_name to username

-- constants rename
ALTER TABLE "user"
  ALTER COLUMN username TYPE VARCHAR(50)

-- constants add
ALTER TABLE "user"
  ALTER COLUMN age SET NOT NULL;

-- constants drop
ALTER TABLE "user"
  ALTER COLUMN age DROP NOT NULL;

-- constants add for primary key and unique
ALTER TABLE "user"
  ADD constraint unique_user_age UNIQUE(age);

ALTER TABLE "user"
  DROP constraint unique_user_age;

TRUNCATE TABLE "user"


