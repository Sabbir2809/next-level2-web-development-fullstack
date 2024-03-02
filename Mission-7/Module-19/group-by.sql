-- Active: 1709038877792@@127.0.0.1@5432@ums@public

SELECT * FROM students;

SELECT country, count(*) FROM students
  GROUP BY country;

  
SELECT age, count(*) FROM students
  GROUP BY age;

SELECT grade, avg(age) FROM students
  GROUP BY grade
  HAVING avg(age) > 21;

SELECT extract(year from dob) as "birth_year", count(*) as "age" FROM students
  GROUP BY extract(year from dob);