INSERT INTO privilege.role (name, level) VALUES
    ('Admin', 1),
    ('Developer', 2),
    ('Manager', 3),
    ('User', 4);

INSERT INTO privilege.permission (name) VALUES
    ('select'),
    ('insert'),
    ('update'),
    ('delete'),
    ('create user'),
    ('enable user'),
    ('disable user');

-- Admin: all
INSERT INTO privilege.role_permission (role, permission)
SELECT r.id, p.id
FROM privilege.role r, privilege.permission p
WHERE r.name = 'Admin' AND p.name IN
    ('select', 'insert', 'update', 'delete', 'create user', 'enable user', 'disable user');

-- Developer: select, insert, update, delete, enable / disable user
INSERT INTO privilege.role_permission (role, permission)
SELECT r.id, p.id
FROM privilege.role r, privilege.permission p
WHERE r.name = 'Developer' AND p.name IN
    ('select', 'insert', 'update', 'delete', 'enable user', 'disable user');

-- Manager: select, insert, update, enable / disable user
INSERT INTO privilege.role_permission (role, permission)
SELECT r.id, p.id
FROM privilege.role r, privilege.permission p
WHERE r.name = 'Manager' AND p.name IN
    ('select', 'insert', 'update', 'enable user', 'disable user');

-- User: select
INSERT INTO privilege.role_permission (role, permission)
SELECT r.id, p.id
FROM privilege.role r, privilege.permission p
WHERE r.name = 'User' AND p.name IN
    ('select');

INSERT INTO corporation.country (abbreviation, name) VALUES ('AT', 'Austria');

INSERT INTO corporation.company (name, department, country) VALUES ('HTL Leoben', 'IT', (SELECT id FROM corporation.country WHERE abbreviation = 'AT'));

INSERT INTO user.user (name, password, email, company, role, disabled) VALUES 
    ('BitSneak', '$2a$10$WGAOnOUAKLdIO.PxJQ8WNuh4ma40MFE5RwWEpH02M2BQnzr3rIw2y', '201wita20@o365.htl-leoben.at', (SELECT id FROM corporation.company WHERE name = 'HTL Leoben'), (SELECT id FROM privilege.role WHERE name = 'Admin'), FALSE),
    ('Luca', '$2a$10$Sjh1lIi84hsSqb.MOoCY6um20Ik1/gdy./NOdAlWY1QmDkTB/7glK', '201wita04@o365.htl-leoben.at', (SELECT id FROM corporation.company WHERE name = 'HTL Leoben'), (SELECT id FROM privilege.role WHERE name = 'Developer'), FALSE),
    ('Max', '$2a$10$PpQk7Z/gtg7xvxlxL0zGdOp34SDmK9gWoDMumKHhFV2OJnDjxnTie', '201wita27@o365.htl-leoben.at', (SELECT id FROM corporation.company WHERE name = 'HTL Leoben'), (SELECT id FROM privilege.role WHERE name = 'Developer'), FALSE);