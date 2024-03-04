-- Active: 1709038877792@@127.0.0.1@5432@ums@public

/*
A trigger is a database object in PostgreSQL (and other database management systems) that automatically executes a specified set of actions in response to certain database events or conditions. 
*/

-- Table-Level Events: INSERT, UPDATE, DELETE, TRUNCATE
-- Database-Level Events: Database Startup, Database Shutdown, Connection start and end etc

-- CREATE TRIGGER trigger_name
-- {BEFORE | AFTER | INSTEAD OF} {INSERT | UPDATE | DELETE | TRUNCATE}
-- ON table_name
-- [FOR EACH ROW] 
-- EXECUTE FUNCTION function_name();

CREATE TABLE my_users(
  user_name VARCHAR(50),
  email VARCHAR(50)
);

INSERT INTO my_users VALUES
  ('mezba', 'mezba@gmail.com'),
  ('mir', 'mir@gmail.com');

SELECT * FROM my_users;
SELECT * FROM deleted_users_audit;

CREATE TABLE deleted_users_audit(
  deleted_user_name VARCHAR(50),
  deletedAt TIMESTAMP
);

INSERT INTO my_users VALUES
  ('mezba', 'mezba@gmail.com'),
  ('mir', 'mir@gmail.com');

-- trigger function
CREATE or REPLACE FUNCTION save_deleted_user()
RETURNS TRIGGER
LANGUAGE plpgsql
as
$$
  BEGIN
    INSERT INTO deleted_users_audit VALUES(OLD.user_name, now());
    RAISE NOTICE 'Ded User Audit Log Created';
    RETURN OLD;
  END
$$

-- create trigger
CREATE or REPLACE TRIGGER save_deleted_user_trigger
BEFORE DELETE
on my_users
for EACH row
EXECUTE FUNCTION save_deleted_user();

DELETE FROM my_users WHERE user_name = 'mir';