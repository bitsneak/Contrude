CREATE DATABASE IF NOT EXISTS configuration DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci;

USE configuration;

CREATE SCHEMA IF NOT EXISTS certificate DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci;
CREATE SCHEMA IF NOT EXISTS corporation DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci;
CREATE SCHEMA IF NOT EXISTS specification DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci;

CREATE TABLE IF NOT EXISTS certificate.tct
(
    id       INT(255) UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    material VARCHAR(25) NOT NULL UNIQUE
) COMMENT 'Timber Component Treatment';

CREATE TABLE IF NOT EXISTS specification.equipment_identifier
(
    id         INT(255) UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    identifier CHAR(1) NOT NULL UNIQUE
);

CREATE TABLE IF NOT EXISTS corporation.continent
(
    id   INT(255) UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL UNIQUE
);

CREATE TABLE IF NOT EXISTS specification.size
(
    id           INT(255) UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    length       CHAR(1)    NOT NULL,
    width_height VARCHAR(2) NOT NULL,

    UNIQUE (length, width_height)
);

CREATE TABLE IF NOT EXISTS corporation.country
(
    id           INT(255) UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    name         VARCHAR(255)      NOT NULL,
    continent    INT(255) UNSIGNED NOT NULL,
    abbreviation VARCHAR(5)        NOT NULL,

    FOREIGN KEY (continent) REFERENCES continent (id) ON DELETE RESTRICT,
    UNIQUE (name, continent, abbreviation)
);

CREATE TABLE IF NOT EXISTS specification.type_code
(
    id              INT(255) UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    code            CHAR(1)      NOT NULL,
    designation     VARCHAR(100) NOT NULL,
    group_code      CHAR(2),
    characteristics VARCHAR(200),
    detail_code_a   CHAR(2)      NOT NULL,
    detail_code_b   CHAR(2),

    UNIQUE (code, designation, group_code, characteristics, detail_code_a, detail_code_b)
);

CREATE TABLE IF NOT EXISTS corporation.company
(
    id           INT(255) UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    prefix       CHAR(3),
    name         VARCHAR(255)      NOT NULL,
    abbreviation VARCHAR(25),
    country      INT(255) UNSIGNED NOT NULL,
    manufacturer BOOLEAN           NOT NULL,
    owner        BOOLEAN           NOT NULL,

    UNIQUE (prefix, name, abbreviation, country, manufacturer, owner),
    CHECK ((owner AND prefix IS NOT NULL) OR (NOT owner AND prefix IS NULL)),

    FOREIGN KEY (country) REFERENCES country (id) ON DELETE RESTRICT
);

CREATE TABLE IF NOT EXISTS certificate.ic
(
    id      INT(255) UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    code    TINYINT(2) UNSIGNED NOT NULL,
    company INT(255) UNSIGNED   NOT NULL,

    UNIQUE (code, company),

    FOREIGN KEY (company) REFERENCES corporation.company (id) ON DELETE RESTRICT
) COMMENT 'InterContainer Codes';

CREATE TABLE IF NOT EXISTS specification.endorsement
(
    id                     INT(255) UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    tare                   SMALLINT(5) UNSIGNED   NOT NULL COMMENT 'in kg',
    max_payload            SMALLINT(5) UNSIGNED   NOT NULL COMMENT 'in kg',
    max_gross              SMALLINT(5) UNSIGNED   NOT NULL COMMENT 'in kg',
    net_capacity           SMALLINT(5) UNSIGNED   NOT NULL COMMENT 'in cum',
    stacking_capacity      MEDIUMINT(6) UNSIGNED  NOT NULL COMMENT 'in kg',
    stacking_load          MEDIUMINT(6) UNSIGNED  NOT NULL COMMENT 'per container in kg',
    transverse_racking     MEDIUMINT(6) UNSIGNED  NOT NULL COMMENT 'in N',
    side_wall_strength     DECIMAL(3, 3) UNSIGNED NOT NULL COMMENT 'in P',
    end_wall_strength      DECIMAL(3, 3) UNSIGNED NOT NULL COMMENT 'in P',
    floor_strength         MEDIUMINT(6) UNSIGNED  NOT NULL COMMENT 'in kg',
    manufacture_date       DATE                   NOT NULL,
    first_examination_date DATE                   NOT NULL,

    UNIQUE (tare, max_payload, max_gross, net_capacity, stacking_capacity, stacking_load, transverse_racking,
            side_wall_strength, end_wall_strength, floor_strength, manufacture_date, first_examination_date),
    CHECK (manufacture_date > '1900-01-01'),
    CHECK (first_examination_date > '1900-01-01')
) COMMENT 'LR standardized';

CREATE TABLE IF NOT EXISTS certificate.ccc
(
    id                         INT(255) UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    prototype_serial_number    VARCHAR(25),
    approval_country           INT(255) UNSIGNED      NOT NULL,
    approval_reference         VARCHAR(25)            NOT NULL,
    ic                         INT(255) UNSIGNED,
    size                       INT(255) UNSIGNED      NOT NULL,
    type                       INT(255) UNSIGNED      NOT NULL,
    owner                      INT(255) UNSIGNED      NOT NULL,
    owner_serial_number        VARCHAR(25)            NOT NULL,
    manufacturer               INT(255) UNSIGNED      NOT NULL,
    manufacturer_serial_number VARCHAR(25)            NOT NULL,
    manufacturer_model_number  VARCHAR(128)           NOT NULL,
    manufacturer_type          VARCHAR(25)            NOT NULL,
    endorsement                INT(255) UNSIGNED      NOT NULL,
    covered_containers         SMALLINT(255) UNSIGNED NOT NULL,

    UNIQUE (prototype_serial_number, approval_country, approval_reference, ic, size, type, owner,
            owner_serial_number, manufacturer, manufacturer_serial_number, manufacturer_model_number,
            manufacturer_type, endorsement, covered_containers),

    FOREIGN KEY (approval_country) REFERENCES corporation.country (id) ON DELETE RESTRICT,
    FOREIGN KEY (ic) REFERENCES ic (id) ON DELETE RESTRICT,
    FOREIGN KEY (size) REFERENCES specification.size (id) ON DELETE RESTRICT,
    FOREIGN KEY (type) REFERENCES specification.type_code (id) ON DELETE RESTRICT,
    FOREIGN KEY (owner) REFERENCES corporation.company (id) ON DELETE RESTRICT,
    FOREIGN KEY (manufacturer) REFERENCES corporation.company (id) ON DELETE RESTRICT,
    FOREIGN KEY (endorsement) REFERENCES specification.endorsement (id) ON DELETE RESTRICT
) COMMENT 'Container Construction Certificate';

CREATE TABLE IF NOT EXISTS certificate.csc
(
    id                    INT(255) UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    csc_number            VARCHAR(25)       NOT NULL,
    ccc                   INT(255) UNSIGNED NOT NULL,
    tct                   INT(255) UNSIGNED NOT NULL,
    next_examination_date DATE              NOT NULL,
    acep                  SMALLINT(5) UNSIGNED COMMENT 'Approved Continuous Examination Program',

    UNIQUE (csc_number, ccc, tct, next_examination_date, acep),
    CHECK (next_examination_date > '1900-01-01'),

    FOREIGN KEY (ccc) REFERENCES ccc (id) ON DELETE RESTRICT,
    FOREIGN KEY (tct) REFERENCES tct (id) ON DELETE RESTRICT
) COMMENT 'International Convention for Save Containers';

CREATE TABLE IF NOT EXISTS configuration.container
(
    id                                 INT(255) UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    serial_number                      TINYINT(6) UNSIGNED NOT NULL,
    check_digit                        TINYINT(1) UNSIGNED NOT NULL,
    csc                                INT(255) UNSIGNED   NOT NULL,
    equipment_identifier               INT(255) UNSIGNED   NOT NULL,
    overhead_electrical_danger_warning BOOLEAN             NOT NULL,
    repair_recommendation              VARCHAR(255),

    UNIQUE (serial_number, check_digit, csc, equipment_identifier, overhead_electrical_danger_warning,
            repair_recommendation),

    FOREIGN KEY (csc) REFERENCES certificate.csc (id) ON DELETE RESTRICT,
    FOREIGN KEY (equipment_identifier) REFERENCES specification.equipment_identifier (id) ON DELETE RESTRICT
);