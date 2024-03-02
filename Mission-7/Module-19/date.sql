-- Active: 1709038877792@@127.0.0.1@5432@ums@public

-- 1. current timezone
SHOW timezone;

-- 2. create table
CREATE TABLE timeZ(ts TIMESTAMP without time zone, tsz TIMESTAMP with time zone);

-- 3. insert data
INSERT INTO timeZ VALUES('2024-02-29 10:53:00','2024-02-29 10:53:00');

-- 4. select all data
SELECT * FROM timeZ;

-- 5. timestamps + timezone
SELECT now();

-- 6. date convert
SELECT now()::date;
SELECT now()::time;
SELECT to_char(now(), 'dd/mm/yyyy');
SELECT to_char(now(), 'Month');
SELECT to_char(now(), 'month');
SELECT to_char(now(), 'Mon');
SELECT to_char(now(), 'Day');
SELECT to_char(now(), 'DDD');
SELECT extract(year from '2024-06-07'::date);
SELECT 'n'::BOOLEAN;
SELECT '1'::BOOLEAN;

-- 7. select current data
SELECT CURRENT_DATE;
SELECT CURRENT_DATE - INTERVAL '1 year' as "One Year Ago";

-- 8. age calculation
SELECT age(CURRENT_DATE, '1998-06-07');
SELECT *, age(CURRENT_DATE, dob) FROM students;