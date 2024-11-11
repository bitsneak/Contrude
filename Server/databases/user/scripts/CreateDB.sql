CREATE DATABASE IF NOT EXISTS user DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_bin;
CREATE SCHEMA IF NOT EXISTS corporation DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_bin;
CREATE SCHEMA IF NOT EXISTS privilege DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_bin;

CREATE TABLE IF NOT EXISTS privilege.role
(
    id    INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    name  VARCHAR(255) NOT NULL UNIQUE,
    level INT UNSIGNED NOT NULL UNIQUE,

    CHECK (NULLIF(name, '') IS NOT NULL AND LENGTH(name) <= 255)
);

CREATE TABLE IF NOT EXISTS privilege.permission
(
    id   INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL UNIQUE,

    CHECK (NULLIF(name, '') IS NOT NULL AND LENGTH(name) <= 255)
);

CREATE TABLE IF NOT EXISTS privilege.role_permission
(
    role       INT UNSIGNED,
    permission INT UNSIGNED,

    PRIMARY KEY (role, permission),

    FOREIGN KEY (role) REFERENCES privilege.role (id),
    FOREIGN KEY (permission) REFERENCES privilege.permission (id)
);

CREATE TABLE IF NOT EXISTS corporation.country
(
    id           INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    abbreviation CHAR(2)      NOT NULL UNIQUE COMMENT 'ISO 3166 Alpha-2',
    name         VARCHAR(255) NOT NULL UNIQUE,

    UNIQUE (abbreviation, name),

    CHECK (abbreviation REGEXP '^[A-Z]{2}$'),
    CHECK (NULLIF(name, '') IS NOT NULL AND LENGTH(name) <= 255)
);

CREATE TABLE IF NOT EXISTS corporation.company
(
    id         INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    name       VARCHAR(255) NOT NULL,
    department VARCHAR(255) NOT NULL,
    country    INT UNSIGNED NOT NULL,

    UNIQUE (name, department, country),

    CHECK (NULLIF(name, '') IS NOT NULL AND LENGTH(name) <= 255),
    CHECK (NULLIF(department, '') IS NOT NULL AND LENGTH(department) <= 255),

    FOREIGN KEY (country) REFERENCES corporation.country (id) ON DELETE RESTRICT
);

CREATE TABLE IF NOT EXISTS user.user
(
    id       INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    name     VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    email    VARCHAR(255) UNIQUE,
    company  INT UNSIGNED NOT NULL,
    role     INT UNSIGNED NOT NULL,
    disabled BOOLEAN      NOT NULL,

    UNIQUE (name, company),

    CHECK (NULLIF(name, '') IS NOT NULL AND LENGTH(name) <= 255),
    CHECK (NULLIF(password, '') IS NOT NULL AND LENGTH(password) <= 255),
    CHECK (email IS NULL OR email REGEXP '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$'),

    FOREIGN KEY (company) REFERENCES corporation.company (id) ON DELETE RESTRICT,
    FOREIGN KEY (role) REFERENCES privilege.role (id) ON DELETE RESTRICT
);

CREATE TABLE IF NOT EXISTS user.token
(
    access  VARCHAR(255),
    refresh VARCHAR(255),

    PRIMARY KEY (access, refresh)
);