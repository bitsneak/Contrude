CREATE DATABASE IF NOT EXISTS ship DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_bin;

USE ship;

CREATE SCHEMA IF NOT EXISTS certificate DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_bin;
CREATE SCHEMA IF NOT EXISTS corporation DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_bin;

CREATE TABLE IF NOT EXISTS corporation.continent
(
    id   INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(13) NOT NULL UNIQUE,

    CHECK (NULLIF(name, '') IS NOT NULL AND LENGTH(name) <= 13)
);

CREATE TABLE IF NOT EXISTS corporation.country
(
    id           INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    name         VARCHAR(255) NOT NULL,
    continent    INT UNSIGNED NOT NULL,
    abbreviation CHAR(2)      NOT NULL COMMENT 'ISO 3166 Alpha-2',

    UNIQUE (name, continent, abbreviation),

    CHECK (NULLIF(name, '') IS NOT NULL AND LENGTH(name) <= 255),
    CHECK (abbreviation REGEXP '^[A-Z]{2}$'),

    FOREIGN KEY (continent) REFERENCES corporation.continent (id)
);

CREATE TABLE IF NOT EXISTS corporation.company
(
    id           INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    name         VARCHAR(255) NOT NULL,
    country      INT UNSIGNED NOT NULL,
    abbreviation CHAR(31),
    is_owner     BOOLEAN      NOT NULL,
    is_operator  BOOLEAN      NOT NULL,

    UNIQUE (name, country, abbreviation),

    CHECK (NULLIF(name, '') IS NOT NULL AND LENGTH(name) <= 255),
    CHECK (abbreviation IS NULL OR (NULLIF(abbreviation, '') IS NOT NULL AND LENGTH(abbreviation) <= 31)),

    FOREIGN KEY (country) REFERENCES corporation.country (id)
);

CREATE TABLE IF NOT EXISTS ship.type
(
    id   INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL UNIQUE,

    CHECK (NULLIF(name, '') IS NOT NULL AND LENGTH(name) <= 255)
);

CREATE TABLE IF NOT EXISTS ship.ship
(
    id                   INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    name                 VARCHAR(255)   NOT NULL,
    imo_number           CHAR(10)       NOT NULL UNIQUE,
    registration_country INT UNSIGNED   NOT NULL,
    type                 INT UNSIGNED   NOT NULL,
    length               DECIMAL(10, 2) NOT NULL COMMENT 'in meters',
    width                DECIMAL(10, 2) NOT NULL COMMENT 'in meters',
    draft                DECIMAL(10, 2) NOT NULL COMMENT 'in meters',
    net_capacity         DECIMAL(12, 2) NOT NULL COMMENT 'in tonnes',
    cargo_capacity       DECIMAL(12, 2) NOT NULL COMMENT 'in tonnes, max cargo weight',
    container_capacity   INT UNSIGNED   NOT NULL COMMENT 'in TEU',
    owner                INT UNSIGNED   NOT NULL,
    operator             INT UNSIGNED   NOT NULL,
    year_built           YEAR           NOT NULL,

    UNIQUE (name, imo_number, registration_country, type, length, width, draft, net_capacity, cargo_capacity,
            container_capacity, owner, operator, year_built),

    CONSTRAINT a CHECK (imo_number REGEXP '^IMO\\d{7}$'),
    CONSTRAINT b CHECK (LENGTH(SUBSTRING_INDEX(length, '.', 1)) <= 10 AND LENGTH(SUBSTRING_INDEX(length, '.', -1)) = 2),
    CONSTRAINT c CHECK (LENGTH(SUBSTRING_INDEX(width, '.', 1)) <= 10 AND LENGTH(SUBSTRING_INDEX(width, '.', -1)) = 2),
    CONSTRAINT d CHECK (LENGTH(SUBSTRING_INDEX(draft, '.', 1)) <= 10 AND LENGTH(SUBSTRING_INDEX(draft, '.', -1)) = 2),
    CONSTRAINT e CHECK (LENGTH(SUBSTRING_INDEX(net_capacity, '.', 1)) <= 12 AND
                        LENGTH(SUBSTRING_INDEX(net_capacity, '.', -1)) = 2),
    CONSTRAINT f CHECK (LENGTH(SUBSTRING_INDEX(cargo_capacity, '.', 1)) <= 12 AND
                        LENGTH(SUBSTRING_INDEX(cargo_capacity, '.', -1)) = 2),
    CONSTRAINT g CHECK (year_built > '1900'),

    FOREIGN KEY (registration_country) REFERENCES corporation.country (id),
    FOREIGN KEY (type) REFERENCES corporation.country (id),
    FOREIGN KEY (owner) REFERENCES corporation.company (id),
    FOREIGN KEY (operator) REFERENCES corporation.company (id)
);

CREATE TABLE IF NOT EXISTS certificate.type
(
    id           INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    name         VARCHAR(255) NOT NULL UNIQUE,
    abbreviation VARCHAR(255) NOT NULL UNIQUE,

    CHECK (NULLIF(name, '') IS NOT NULL AND LENGTH(name) <= 255),
    CHECK (NULLIF(abbreviation, '') IS NOT NULL AND LENGTH(abbreviation) <= 255)
);

CREATE TABLE IF NOT EXISTS certificate.status
(
    id   INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL UNIQUE,

    CHECK (NULLIF(name, '') IS NOT NULL AND LENGTH(name) <= 255)
);

CREATE TABLE IF NOT EXISTS certificate.general_certificate
(
    id                INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    ship              INT UNSIGNED NOT NULL,
    type              INT UNSIGNED NOT NULL,
    issuing_authority VARCHAR(255) NOT NULL,
    issue_date        DATE         NOT NULL,
    expiry_date       DATE         NOT NULL,
    status            INT UNSIGNED NOT NULL,
    notes             TEXT,

    UNIQUE (ship, type, issuing_authority, issue_date, expiry_date),

    CHECK (issue_date > '1900-01-01'),
    CHECK (expiry_date > '1900-01-01'),
    CHECK (NULLIF(notes, '') IS NOT NULL),

    FOREIGN KEY (ship) REFERENCES ship.ship (id),
    FOREIGN KEY (type) REFERENCES certificate.type (id),
    FOREIGN KEY (status) REFERENCES certificate.status (id)
);

CREATE TABLE IF NOT EXISTS certificate.load_line_zone
(
    id   INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL UNIQUE,

    CHECK (NULLIF(name, '') IS NOT NULL AND LENGTH(name) <= 255)
) COMMENT 'Load line zones for ILLC';

CREATE TABLE IF NOT EXISTS certificate.illc
(
    id                    INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    certificate           INT UNSIGNED  NOT NULL,
    load_line_zone        INT UNSIGNED  NOT NULL,
    freeboard_measurement DECIMAL(8, 2) NOT NULL COMMENT 'in meters',

    UNIQUE (certificate, load_line_zone, freeboard_measurement),

    CHECK (NULLIF(load_line_zone, '') IS NOT NULL AND LENGTH(load_line_zone) <= 255),
    CHECK (LENGTH(SUBSTRING_INDEX(freeboard_measurement, '.', 1)) <= 8 AND
           LENGTH(SUBSTRING_INDEX(freeboard_measurement, '.', -1)) = 2),

    FOREIGN KEY (certificate) REFERENCES certificate.general_certificate (id),
    FOREIGN KEY (load_line_zone) REFERENCES certificate.load_line_zone (id)
) COMMENT 'International Load Line Certificate';

CREATE TABLE IF NOT EXISTS certificate.equipment_type
(
    id   INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL UNIQUE,

    CHECK (NULLIF(name, '') IS NOT NULL AND LENGTH(name) <= 255)
) COMMENT 'Equipment types for IOPP';

CREATE TABLE IF NOT EXISTS certificate.disposal_method
(
    id   INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL UNIQUE,

    CHECK (NULLIF(name, '') IS NOT NULL AND LENGTH(name) <= 255)
) COMMENT 'Disposal methods for IOPP';

CREATE TABLE IF NOT EXISTS certificate.iopp
(
    id               INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    certificate      INT UNSIGNED NOT NULL,
    equipment_type   INT UNSIGNED NOT NULL,
    disposal_methode INT UNSIGNED NOT NULL,

    UNIQUE (certificate, equipment_type, disposal_methode),

    CHECK (NULLIF(equipment_type, '') IS NOT NULL AND LENGTH(equipment_type) <= 255),
    CHECK (NULLIF(disposal_methode, '') IS NOT NULL AND LENGTH(disposal_methode) <= 255),

    FOREIGN KEY (certificate) REFERENCES certificate.general_certificate (id),
    FOREIGN KEY (equipment_type) REFERENCES certificate.equipment_type (id),
    FOREIGN KEY (disposal_methode) REFERENCES certificate.disposal_method (id)
) COMMENT 'International Oil Pollution Prevention Certificate';

CREATE TABLE IF NOT EXISTS certificate.treatment_system
(
    id   INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL UNIQUE,

    CHECK (NULLIF(name, '') IS NOT NULL AND LENGTH(name) <= 255)
) COMMENT 'Treatment systems for BWMC';

CREATE TABLE IF NOT EXISTS certificate.bwmc
(
    id               INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    certificate      INT UNSIGNED NOT NULL,
    treatment_system INT UNSIGNED NOT NULL,

    UNIQUE (certificate, treatment_system),

    CHECK (NULLIF(treatment_system, '') IS NOT NULL AND LENGTH(treatment_system) <= 255),

    FOREIGN KEY (certificate) REFERENCES certificate.general_certificate (id),
    FOREIGN KEY (treatment_system) REFERENCES certificate.treatment_system (id)
) COMMENT 'Ballast Water Management Certificate';

CREATE TABLE IF NOT EXISTS certificate.iapp
(
    id             INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    certificate    INT UNSIGNED NOT NULL,
    sox_compliance BOOLEAN      NOT NULL,
    nox_compliance BOOLEAN      NOT NULL,

    UNIQUE (certificate, sox_compliance, nox_compliance),

    FOREIGN KEY (certificate) REFERENCES certificate.general_certificate (id)
) COMMENT 'International Air Pollution Prevention Certificate';

CREATE TABLE IF NOT EXISTS certificate.smc
(
    id            INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    certificate   INT UNSIGNED NOT NULL,
    audit_results TEXT         NOT NULL,

    CHECK (NULLIF(audit_results, '') IS NOT NULL),

    FOREIGN KEY (certificate) REFERENCES certificate.general_certificate (id)
) COMMENT 'Safety Management Certificate';