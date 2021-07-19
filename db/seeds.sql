INSERT INTO department
    (name)
VALUES
  ('IT'),
  ('HR'),
  ('Marketing'),
  ('Sales'),
  ('Finance'),
  ('Engineering'),
  ('Legal');

INSERT INTO role
  (title, salary, department_id)
VALUES
  ('Software Engineer', 120000, 6),
  ('Lead Engineer', 150000, 6),
  ('Intern', 40000, 6),

  ('Salesperson', 80000, 5),
  ('Sales Lead', 100000, 5),

  ('Legal Team Lead', 80000, 7),
  ('Lawyer', 140000, 7),
  ('Intern', 40000, 7),

  ('Accountant', 125000, 5);

INSERT INTO employee
  (first_name, last_name, role_id, manager_id)
VALUES
  ('Ronald', 'Firbank', 1, 1),
  ('Virginia', 'Woolf', 1, NULL),
  ('Charles', 'LeRoi', 2, 1),
  ('Katherine', 'Mansfield', 2, NULL),
  ('Octavia', 'Butler', 3, NULL),
  ('Unica', 'Zurn', 3, 1);