-- Active: 1709038877792@@127.0.0.1@5432@ums@public

SELECT * FROM employees;

CREATE PROCEDURE remove_emp()
LANGUAGE plpgsql
AS
$$
  BEGIN
    DELETE FROM employees WHERE employee_id = 28;
  END
$$;
CALL remove_emp();

-- function with parameter
CREATE PROCEDURE remove_emp_with_id(p_emp_id int)
LANGUAGE plpgsql
AS
$$
  DECLARE
    test_var INT;

  BEGIN
    SELECT employee_id INTO test_var FROM employees WHERE employee_id = p_emp_id;
    DELETE FROM employees WHERE employee_id = test_var;

    RAISE NOTICE 'Employee Removed Successfully';
  END
$$;
CALL remove_emp_with_id(27);