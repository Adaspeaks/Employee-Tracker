USE employees_db;

INSERT INTO department(name)
VALUES
    ('Sales'),
    ('Customer Service'),
    ('Management'),
    ('Tech');

INSERT INTO role (title, salary, department_id)
VALUES ('Sales Agent', 24000, 1),
    ('Sales Team Lead', 28000, 1),
    ('Sales Floor Lead', 30000, 1),
    ('Customer Service Agent', 22000, 2),
    ('Service Team Lead', 24000, 2),
    ('Floor Manager', 40000, 3),
    ('Lead Manager', 60000, 3),
    ('Tier 1 Technician', 25000, 4),
    ('Tier 2 Technician', 27000, 4),
    ('Lead Technician', 30000, 4),
    ('CORE technician', 35000, 4);

INSERT INTO employee(first_name, last_name, role_id, manager_id)
VALUES ('Jack', 'Doe', 1, 1),
    ('Jane','Doe', 2, 2),
    ('John','Doe', 3, 3),
    ('Tom', 'Boy', 4, 4),
    ('Tanya','Girl', 5, 3),
    ('Manuel','Man', 6, 5),
    ('Wanda','Woman', 7, NULL),
    ('Basement','Nerd', 8, 6),
    ('Keyboard','Warrior', 9, 7),
    ('Code','Guy', 10, 5),
    ('Power','Trip', 11, NULL);