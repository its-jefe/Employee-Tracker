INSERT INTO department
    (name)
VALUES
  ('IT'),
  ('Software Developement'),
  ('HR'),
  ('Marketing'),
  ('Legal');

INSERT INTO role
  (title, salary, department_id)
VALUES
  ('manager', 140000, 1),
  ('engineer', 80000, 1),
  ('intern', 40000, 1),
  ('manager', 140000, 2),
  ('engineer', 80000, 2),
  ('intern', 40000, 2);

INSERT INTO employee
  (first_name, last_name, role_id, manager_id)
VALUES
  ('Ronald', 'Firbank', 1, 1),
  ('Virginia', 'Woolf', 1, NULL),
  ('Charles', 'LeRoi', 2, 1),
  ('Katherine', 'Mansfield', 2, NULL),
  ('Octavia', 'Butler', 3, NULL),
  ('Unica', 'Zurn', 3, 1);