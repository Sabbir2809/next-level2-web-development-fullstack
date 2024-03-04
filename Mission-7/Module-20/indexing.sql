-- Active: 1709038877792@@127.0.0.1@5432@ums@public

SELECT * from  employees;

EXPLAIN ANALYSE
SELECT * from employees WHERE employee_name = 'Andrew Cook';

CREATE INDEX idx_employees_name
on employees (employee_name);

CREATE INDEX idx_employees_name
on employees USING Hash(employee_name);

SHOW data_directory;