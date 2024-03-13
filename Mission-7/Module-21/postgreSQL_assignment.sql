
-- Create Database
CREATE DATABASE company_db;

-- Create Table
CREATE TABLE departments(
  department_id SERIAL PRIMARY KEY UNIQUE,
  department_name VARCHAR(50)
);

-- Insert data into departments table
INSERT INTO departments (department_name) VALUES 
  ('Engineering'),
  ('Marketing'),
  ('Finance');

-- Create Table
CREATE TABLE employees(
  employee_id SERIAL PRIMARY KEY UNIQUE,
  employee_name VARCHAR(50),
  age INTEGER,
  email VARCHAR(50),
  department_id INTEGER REFERENCES "departments"(department_id),
  salary NUMERIC,
  status VARCHAR(50)
);

-- Insert data into employees table
INSERT INTO employees (employee_name, age, email, department_id, salary, status) VALUES
    ('Alice', 30, 'alice@example.com', 1, 60000, NULL),
    ('Bob', 35, 'bob@example.net', 2, 65000, NULL),
    ('Charlie', 28, 'charlie@google.com', 1, 55000, NULL),
    ('David', 33, 'david@yahoo.com', 2, 62000, NULL),
    ('Eve', 31, 'eve@example.net', 3, 58000, NULL),
    ('Frank', 29, 'frank@example.com', 1, 59000, NULL),
    ('Grace', 34, 'grace@google.com', 2, 63000, NULL),
    ('Henry', 32, 'henry@yahoo.com', 3, 57000, NULL),
    ('Ivy', 27, 'ivy@gmail.com', 1, 56000, NULL),
    ('Jack', 36, 'jack@example.net', 2, 64000, NULL),
    ('Karen', 29, 'karen@gmail.com', 3, 60000, NULL),
    ('Liam', 33, 'liam@gmail.com', 1, 59000, NULL),
    ('Mia', 31, 'mia@yahoo.com', 2, 62000, NULL),
    ('Nora', 28, 'nora@yahoo.com', 3, 57000, NULL),
    ('Oliver', 35, 'oliver@example.net', 1, 61000, NULL),
    ('Penelope', 30, 'penelope@google.com', 2, 63000, NULL),
    ('Quinn', 32, 'quinn@google.com', 3, 59000, NULL),
    ('Rachel', 27, 'rachel@gmail.com', 1, 55000, NULL),
    ('Sam', 34, 'sam@example.net', 2, 64000, NULL),
    ('Taylor', 31, 'taylor@yahoo.com', 3, 58000, NULL);


-- Query-1:
SELECT * FROM employees
  WHERE salary > 60000; -- Selects employees with a salary greater than 60000


-- Query-2:
SELECT employee_name FROM employees
  ORDER BY employee_id ASC -- Orders the results by employee_id in ascending order
  LIMIT 2 OFFSET 2; -- Limits the results to 2 rows starting from the 3rd row


-- Query-3:
SELECT ROUND(AVG(age), 1) AS average_age FROM employees; -- Calculates and rounds the average_age of all employees to 1 decimal place


-- Query-4:
SELECT employee_name FROM employees 
  WHERE email LIKE '%example.com' -- Select employees with email ending in 'example.com'
    OR email LIKE '%example.net'  -- Select employees with email ending in 'example.net'
    OR email LIKE '%google.com'   -- Select employees with email ending in 'google.com'
    ORDER BY employee_id ASC;     -- employee_id in ascending order


-- Query-5:
SELECT employee_name FROM employees
  JOIN departments USING(department_id) -- Joins employees and departments tables based on department_id
  WHERE departments.department_name = 'Engineering'; -- Retrieves employees who belong to the 'Engineering' department


-- Query-6:
UPDATE employees
  SET status = 'Promoted' -- Sets the status of the employee with the highest salary to 'Promoted'
  WHERE salary = (SELECT MAX(salary) AS salary FROM employees); -- Sub-query to identify the employee with the highest salary


-- Query-7:
SELECT department_name, AVG(salary) FROM employees
  JOIN departments USING(department_id) -- Joins employees and departments tables based on department_id
  GROUP BY department_name; -- Groups the results by department_name and calculates the average salary for each department
 
