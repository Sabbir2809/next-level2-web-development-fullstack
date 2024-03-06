# PostgreSQL Cheat Sheet

PostgreSQL is an open-source relational database management system. Known for its robust features, extensibility, and adherence to standards, it is a powerful and widely used database solution for storing, managing, and processing data across diverse environments.

## CONNECTING TO A POSTGRESQL SERVER

1. Connect to a PostgreSQL server using the PostgreSQL command-line client (psql) and To connect to a specific database on a PostgreSQL server with a username:
   `psql -U postgres -d your_database_name;`
2. To exit the client:
   `\q;`
3. Terminal Clear:
   `\! cls;`

## CREATING AND DISPLAYING DATABASES

1. To create a database:
   `CREATE DATABASE your_database_name;`
2. To delete a specific database:
   `DROP DATABASE your_database_name;`
3. To list all the databases on a server:
   `\l;`
4. To connect to a specific database:
   `\c your_database_name;`
5. To list all tables in a database(List of relations):
   `\dt;`
6. To get information about a specific table::
   `\d your_database_table_name;`

## CREATING TABLES

1. To create a table:

   ```sql
   CREATE TABLE habitat (
   id INT,
   name VARCHAR(30)
   );
   ```

2. To increment the ID automatically with each new record, use the SERIAL data type:

   ```sql
   CREATE TABLE habitat (
   id INT SERIAL PRIMARY KEY,
   name VARCHAR(30)
    );
   ```

3. To create a table with a foreign key:
   ```sql
   CREATE TABLE animal (
   id SERIAL PRIMARY KEY,
   name VARCHAR(30),
   species VARCHAR(30),
   age INT,
   habitat_id INT,
   FOREIGN KEY (habitat_id) REFERENCES habitat(id)
   );
   ```

## MODIFYING TABLES

Use the `ALTER TABLE` to modify a table structure.

1. To change a table name:
   ```sql
    ALTER TABLE animal RENAME TO pet;
   ```
2. To add a column to the table:
   ```sql
   ALTER TABLE animal
   ADD COLUMN name VARCHAR(50);
   ```
3. To change a column name:
   ```sql
   ALTER TABLE animal
   RENAME COLUMN id TO animal_id;
   ```
4. To change a column data type:
   ```sql
   ALTER TABLE animal
   ALTER COLUMN name TYPE VARCHAR(60);
   ```
5. To delete a column:
   ```sql
   ALTER TABLE animal
   DROP COLUMN name;
   ```
6. To delete a table:
   ```sql
   DROP TABLE animal;
   ```

## QUERYING DATA

To select data from a table, use SELECT.

1. To delete a table:
   ```sql
   SELECT species, AVG(age) AS average_age FROM animal
   WHERE id != 3
   GROUP BY species
   HAVING AVG(age) > 3
   ORDER BY AVG(age) DESC;
   ```
2. An example of a multiple-table query:
   ```sql
   SELECT city.name, country.name FROM city
   [INNER | LEFT | RIGHT | FULL] JOIN country ON city.country_id = country.id;
   ```

## INSERTING DATA

1. To insert data into a table, use `INSERT`:
   ```sql
   INSERT INTO habitat VALUES
   (1, 'River'),
   (2, 'Forest');
   ```
2. You may specify the columns in which the data is added. The remaining columns are filled with default values or NULLs.
   ```sql
   INSERT INTO habitat (name)
   VALUES ('Savanna');
   ```

## UPDATING DATA (Dangerous)

1. To update the data in a table, use `UPDATE`:
   ```sql
   UPDATE animal
   SET species = 'Duck', name = 'Quack'
   WHERE id = 2;
   ```

## UPDATING DATA (Dangerous)

1. To delete data from a table, use `DELETE`: (This deletes all rows satisfying the WHERE condition)
   ```sql
   DELETE FROM animal
   WHERE id = 1;
   ```
2. To delete all data from a table, use TRUNCATE TABLE:
   ```sql
   TRUNCATE TABLE animal;
   ```

## AGGREGATION AND GROUPING

- `AVG(expr)` − average value of expr for the group.
- `COUNT(expr)` − count of expr values within the group.
- `MAX(expr)` − maximum value of expr values within the group.
- `MIN(expr)` − minimum value of expr values within the group.
- `SUM(expr)` − sum of expr values within the group.

**AGGREGATION:**

1. To count the rows in the table:
   ```sql
   SELECT COUNT(*) FROM animal;
   ```
2. To count the non-NULL values in a column:
   ```sql
   SELECT COUNT(name) FROM animal;
   ```
3. To count unique values in a column:
   ```sql
   SELECT COUNT(DISTINCT name) FROM animal;
   ```

**GROUP BY:**

1. To count the animals by species:

   ```sql
   SELECT species, COUNT(id) FROM animal
   GROUP BY species;
   ```

2. To get the average, minimum, and maximum ages by habitat:
   ```sql
   SELECT habitat_id, AVG(age), MIN(age), MAX(age) FROM animal
   GROUP BY habitat_id;
   ```

## CASTING

1. To change the type of a value, use the `::` operator:

   ```sql
   SELECT 25.5::INTEGER;  -- result: 26
   ```

2. You may also use `CAST()`. This is useful when the name of the type contains spaces:

   ```sql
   SELECT CAST(column AS DOUBLE PRECISION);
   ```

## TEXT FUNCTIONS

**FILTERING THE OUTPUT:**

1. To fetch the city names that are `not Berlin`:

   ```sql
   SELECT name FROM city
   WHERE name != 'Berlin';
   ```

**TEXT OPERATORS:**

1. To fetch the city names that start with a `'P'`:

   ```sql
   SELECT name FROM city
   WHERE name LIKE 'P%';
   ```

2. To fetch the city names that start with any letter followed by 'ublin' (like Dublin in Ireland or Lublin in Poland):

   ```sql
   SELECT name FROM city
   WHERE name LIKE '_ublin';
   ```

**CONCATENATION:**

1.  To concatenate two strings, use the || operator or the CONCAT() function:

    ```sql
    SELECT 'Hi ' || 'there!';-- result: Hi there!

    SELECT CONCAT('Hello ', 'there!');-- result: Hello there!

    --Note that with ||, the result is NULL if any of the strings is NULL:
    SELECT 'Great ' || 'day' || NULL;-- result: NULL

    --In contrast, CONCAT() ignores NULL:
    SELECT CONCAT('Good ', 'day', NULL);-- result: Good day
    ```

**OTHER USEFUL TEXT FUNCTIONS:**

```sql
--To get the count of characters in a string:
SELECT LENGTH('Hero');-- result: 4

--To convert all letters to lowercase:
SELECT LOWER('HERO');-- result: hero

--To convert all letters to uppercase:
SELECT UPPER('hero');-- result: HERO

--To capitalize the first letter of each word in a string, use INITCAP():
SELECT INITCAP('hello world');-- result: Hello World

--To get a part of a string:
SELECT SUBSTRING('PostgreSQL', 7);-- result: SQL
SELECT SUBSTRING('PostgreSQL', 1, 7);-- result: Postgre

--To replace a part of a string:
SELECT REPLACE('TypeScript', 'Type', 'Java');-- result: JavaScript
```

## NUMERIC FUNCTIONS

Use` +, -, *, /` for basic math.

```sql
--To get the number of seconds in a week:
SELECT 60 * 60 * 24 * 7;-- result: 604800

--In PostgreSQL, the division operator / performs an integer division on integer arguments.
SELECT 25 / 4;-- result 6

--Avoid integer division by including at least one non-integer argument:
SELECT 25::numeric / 4;-- result 6.25
SELECT 25.0 / 4;-- result 6.25

--To get the remainder of a division:
SELECT MOD(13, 2);-- result: 1
SELECT 13 % 2;-- result: 1

--To round a number to its nearest integer::
SELECT ROUND(1234.56789);-- result: 1235

--To round a number to three decimal places (NUMERIC arguments only):
SELECT ROUND(1234.56789, 3);-- result: 1234.568

-- To get the absolute value of a number:
SELECT ABS(-12);-- result: 12

-- To get the square root of a number:
SELECT SQRT(9);-- result: 3
```

## USEFUL NULL FUNCTIONS

1. To fetch the names of the cities whose rating values are not missing:

   ```sql
   SELECT name FROM city
   WHERE rating IS NOT NULL;
   ```

2. To replace NULL in a query with something meaningful: COALESCE(x, y, ...)

   ```sql
   --COALESCE() takes any number of arguments and returns the value of the first non-NULL argument.
   SELECT domain, COALESCE(domain, 'N/A') FROM contacts;
   ```

3. To save yourself from division by 0 errors:
   ```sql
   --NULLIF(x, y) returns NULL if x equals y; else it returns the value of x.
   SELECT last_month, this_month,
   this_month * 100.0 / NULLIF(last_month, 0) AS better_by_percent
   FROM video_views;
   ```

## DATE AND TIME

There are 5 main time-related types in PostgreSQL:

- DATE – stores the year, month, and day in the `YYYY-MM-DD` format.

- TIME – stores the hours, minutes, seconds, and fractional seconds in the `HH:MM:SS.SSSSSS` format.

- TIMESTAMP WITH TIME ZONE – a timestamp with the time zone; stores the date and the time along with the corresponding time zone information. The range is from `4713-11-24 00:00:00` BC to `294276-12-31 23:59:59` AD.

- TIMESTAMP – a timestamp without the time zone; stores the date and the time. PostgreSQL handles `TIMESTAMP` values automatically with time zone conversion.

- INTERVAL – a duration of time, such as 3 days, 4 hours, and 30 minutes.

WHAT TIME IS IT?

- `CURRENT_TIME` – to get the current time.
- `CURRENT_DATE` – to get the current date.
- `CURRENT_TIMESTAMP` – to get the current timestamp with both of the above.

**CREATING DATE/TIME VALUES:**

1. To create a date, time, or datetime value, write it as a string and cast it to the desired type.

```sql
SELECT '2024-02-29'::date;
SELECT '15:31'::time;
SELECT '2024-02-29 23:59:29'::timestamp;
```

**EXTRACTING PARTS OF DATES:**

1. To extract a part of a date, use EXTRACT():

   ```sql
   SELECT EXTRACT(MONTH FROM '2024-02-29'::DATE);-- result: 02
   ```

2. You may also use DATE_PART(). It extracts specific components from a date or timestamp.

   ```sql
   --Common arguments include 'day', 'month', 'year', 'quarter', 'hour', 'minute', and 'second', among others.
   SELECT DATE_PART('day', '2024-02-29'::DATE);-- result: 29
   ```

**DATE ARITHMETICS:**

1. To add or subtract an INTERVAL from a date, time, or timestamp:

   ```sql
   --To add or subtract an INTERVAL from a date, time, or timestamp:
   SELECT '2023-10-31'::DATE + INTERVAL '2 months';-- result: '2023-12-31'
   SELECT '2024-04-05'::DATE + INTERVAL '-3 days';-- result: '2024-04-02'
   SELECT '2023-06-10 07:55:00'::TIMESTAMP + INTERVAL '2 months';-- result: '2023-08-10 07:55:00'
   SELECT '2023-02-12 10:20:24'::TIMESTAMP + INTERVAL '-12:43:02';-- result: '2023-02-11 21:37:22'
   ```
