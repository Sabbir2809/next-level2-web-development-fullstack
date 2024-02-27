-- Active: 1709038877792@@127.0.0.1@5432@ums

-- create a new table schema
CREATE TABLE students (
  student_id SERIAL PRIMARY KEY,
  first_name VARCHAR(10) NOT NULL,
  last_name VARCHAR(10) NOT NULL,
  age INT,
  email VARCHAR(50),
  dob Date,
  blood_group VARCHAR(3),
  country VARCHAR(50),
  grade CHAR(2),
  course VARCHAR(50)
);

-- insert to into students table
INSERT INTO students (first_name, last_name, age, email, dob, blood_group, country, grade, course) 
  VALUES
  ('Fatima', 'Akhtar', 21, 'fakhtar@example.com', '2002-05-20', 'B-', 'Bangladesh', 'B', 'Electrical Engineering'),
  ('Ahmed', 'Hossain', 19, 'ahossain@example.com', '2003-12-10', 'O+', 'Bangladesh', 'A', 'Mechanical Engineering'),
  ('Sadia', 'Khan', 22, 'skhan@example.com', '2000-10-03', 'AB-', 'Bangladesh', 'B', 'Civil Engineering'),
  ('Rafi', 'Islam', 18, 'rislam@example.com', '2005-03-25', 'A-', 'Bangladesh', 'C', 'Architecture'),
  ('Tasnim', 'Ali', 20, 'tali@example.com', '2002-11-17', 'B+', 'Bangladesh', 'B', 'Medicine'),
  ('Nadia', 'Chowdhury', 21, 'nchowdhury@example.com', '2001-07-08', 'O-', 'Bangladesh', 'A', 'Dentistry'),
  ('Imran', 'Kabir', 19, 'ikabir@example.com', '2003-01-30', 'A+', 'Bangladesh', 'B', 'Business Administration'),
  ('Ayesha', 'Sultana', 20, 'asultana@example.com', '2002-09-12', 'AB+', 'Bangladesh', 'C', 'Economics'),
  ('Farhan', 'Islam', 22, 'fislam@example.com', '2000-04-27', 'B-', 'Bangladesh', 'A', 'English Literature'),
  ('Sabbir', 'Hossain', 25, 'sabbir@example.com', '1998-04-27', 'A+', 'Bangladesh', 'A+', 'CSE'),
  ('Abu', 'Salkin', 24, 'salkin@example.com', '200-04-27', 'B+', 'Bangladesh', 'B+', 'CSE');


-- select all data form students table
SELECT * FROM students;

-- select specific column form students table
SELECT first_name, course, grade FROM students;

-- select specific column rename
SELECT email as "Student Email" FROM students;

-- order by ASC or DESC
SELECT * FROM students ORDER BY grade ASC;

-- unique data
SELECT DISTINCT blood_group FROM students;

-- data filtering (where, and, or)
SELECT * FROM students
  WHERE grade = 'A' AND course = 'Computer Science';

SELECT * FROM students
  WHERE blood_group = 'A+';

SELECT * FROM students
  WHERE (grade = 'A' OR age > 21 ) AND course = 'Computer Science';

SELECT * FROM students
  WHERE age <> 20;

-- scalar functions [upper(), lower(), concat(), length()]
SELECT upper(first_name) as "First Name" FROM students;
SELECT concat(first_name, ' ', last_name) as "Full Name" FROM students;
SELECT length(first_name) as "Full Name (Length)" FROM students;

-- aggregate functions [avg(), max(), min(), sum(), count()]
SELECT avg(age) from students;
SELECT min(age) as "Min Age" from students;
SELECT max(age) as "Max Age" from students;
SELECT sum(age) as "Total Age" from students;
SELECT count(age) as "Student Count" from students;

-- combine aggregate and scalar
SELECT max(length(first_name)) as "Full Name (Length)" FROM students;

-- logical negation NOT, understanding NULL and the Null-Coalescing
SELECT * FROM students
  WHERE NOT grade = 'A';

SELECT * FROM students
  WHERE email is NULL;

SELECT COALESCE(email,'N/A') as "Email" FROM students;

-- Exploring IN, BETWEEN, LIKE, and ILIKE Operators
SELECT * FROM students
  WHERE grade NOT IN('A+', 'A');

SELECT * FROM students
  WHERE age BETWEEN 18 and 20;


SELECT * FROM students
  WHERE dob BETWEEN '2000-01-01' and '2002-01-01' ORDER BY dob LIMIT 2;

SELECT * FROM students
  WHERE first_name LIKE '%ir';

SELECT * FROM students
  WHERE first_name LIKE '%s%';

SELECT * FROM students
  WHERE first_name ILIKE 's%';

SELECT * FROM students
  WHERE first_name LIKE '__bb%';

-- Pagination with limit offset and data deletion
SELECT * FROM students LIMIT 5 OFFSET 5 * 1;

DELETE FROM students
  WHERE age = 24 and email = 'salkin@example.com';

SELECT * FROM students;

-- update operators
UPDATE students
  SET email = 'sabbirto@gmail.com', dob = '1998-06-07'
  WHERE student_id = 31