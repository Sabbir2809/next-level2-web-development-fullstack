-- Active: 1709038877792@@127.0.0.1@5432@ums@public

SELECT * FROM employees;

-- Simplifying complex queries
-- Improved security
-- Enhanced data abstraction

-- create views
CREATE VIEW dept_avg_salary
  AS
  SELECT department_name, avg(salary) FROM employees
  GROUP BY department_name;

-- select view 
SELECT * FROM dept_avg_salary;

-- create views
CREATE VIEW test_view
as 
SELECT employee_name, salary, department_name FROM employees 
  WHERE department_name in 
  (SELECT department_name FROM employees WHERE department_name LIKE 'HR');

-- select view 
SELECT * FROM test_view;