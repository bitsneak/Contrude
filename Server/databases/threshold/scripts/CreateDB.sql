CREATE DATABASE IF NOT EXISTS threshold DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_bin;

CREATE TABLE IF NOT EXISTS threshold.parameter
(
    id   INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    unit VARCHAR(255) NOT NULL,

    UNIQUE (name, unit),

    CHECK (NULLIF(name, '') IS NOT NULL AND LENGTH(name) <= 255),
    CHECK (NULLIF(unit, '') IS NOT NULL AND LENGTH(unit) <= 255)
);

CREATE TABLE IF NOT EXISTS threshold.rule
(
    id   INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL UNIQUE,

    CHECK (NULLIF(name, '') IS NOT NULL AND LENGTH(name) <= 255)
);

CREATE TABLE IF NOT EXISTS threshold.level
(
    id       INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    name     VARCHAR(255) NOT NULL UNIQUE,
    priority INT UNSIGNED NOT NULL UNIQUE,

    CHECK (NULLIF(name, '') IS NOT NULL AND LENGTH(name) <= 255)
);

CREATE TABLE IF NOT EXISTS threshold.threshold
(
    id           INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    container_id INT UNSIGNED  NOT NULL,
    parameter    INT UNSIGNED  NOT NULL,
    rule         INT UNSIGNED  NOT NULL,
    level        INT UNSIGNED  NOT NULL,
    value        DECIMAL(8, 5) NOT NULL,

    UNIQUE (container_id, parameter, rule, level, value),

    CHECK (LENGTH(SUBSTRING_INDEX(value, '.', 1)) <= 3 AND LENGTH(SUBSTRING_INDEX(value, '.', -1)) <= 5),

    FOREIGN KEY (parameter) REFERENCES threshold.parameter (id) ON DELETE RESTRICT,
    FOREIGN KEY (rule) REFERENCES threshold.rule (id) ON DELETE RESTRICT,
    FOREIGN KEY (level) REFERENCES threshold.level (id) ON DELETE RESTRICT
);