CREATE DATABASE IF NOT EXISTS configuration DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci;

USE configuration;

CREATE SCHEMA IF NOT EXISTS certificate DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci;
CREATE SCHEMA IF NOT EXISTS corporation DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci;
CREATE SCHEMA IF NOT EXISTS dimension DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci;

CREATE TABLE IF NOT EXISTS certificate.tct
(
    id       INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    material VARCHAR(25) NOT NULL UNIQUE
) COMMENT 'Timber Component Treatment';

CREATE TABLE IF NOT EXISTS corporation.continent
(
    id   INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL UNIQUE
);

CREATE TABLE IF NOT EXISTS dimension.equipment_identifier
(
    id         INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    identifier CHAR(1) NOT NULL UNIQUE
);

CREATE TABLE IF NOT EXISTS dimension.size
(
    id           INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    length       CHAR(1)    NOT NULL,
    width_height VARCHAR(2) NOT NULL,

    UNIQUE (length, width_height)
);

CREATE TABLE IF NOT EXISTS corporation.country
(
    id           INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    name         VARCHAR(255) NOT NULL,
    continent    INT UNSIGNED NOT NULL,
    abbreviation VARCHAR(5)   NOT NULL,

    UNIQUE (name, continent, abbreviation),

    CHECK (LENGTH(name) <= 255),
    CHECK (LENGTH(abbreviation) <= 5),

    FOREIGN KEY (continent) REFERENCES continent (id) ON DELETE RESTRICT
);

CREATE TABLE IF NOT EXISTS dimension.type_code
(
    id              INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    code            CHAR(1)      NOT NULL,
    designation     VARCHAR(127) NOT NULL,
    group_code      CHAR(2),
    characteristics VARCHAR(127),
    detail_code_a   CHAR(2)      NOT NULL,
    detail_code_b   CHAR(2),

    UNIQUE (code, designation, group_code, characteristics, detail_code_a, detail_code_b),

    CHECK (LENGTH(designation) <= 127),
    CHECK (group_code IS NULL OR LENGTH(group_code) = 2),
    CHECK (characteristics IS NULL OR LENGTH(characteristics) <= 127),
    CHECK (LENGTH(detail_code_a) = 2),
    CHECK (detail_code_b IS NULL OR (detail_code_b) = 2)
);

CREATE TABLE IF NOT EXISTS corporation.company
(
    id           INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    prefix       CHAR(3),
    name         VARCHAR(255) NOT NULL,
    abbreviation VARCHAR(31),
    country      INT UNSIGNED NOT NULL,
    manufacturer BOOLEAN      NOT NULL,
    owner        BOOLEAN      NOT NULL,

    UNIQUE (prefix, name, abbreviation, country, manufacturer, owner),

    CHECK (prefix IS NULL OR LENGTH(prefix) = 3),
    CHECK (LENGTH(name) <= 255),
    CHECK (abbreviation IS NULL OR LENGTH(abbreviation) <= 31),
    CHECK ((owner AND prefix IS NOT NULL) OR (NOT owner AND prefix IS NULL)),

    FOREIGN KEY (country) REFERENCES country (id) ON DELETE RESTRICT
);

CREATE TABLE IF NOT EXISTS certificate.ic
(
    id      INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    code    INT UNSIGNED NOT NULL,
    company INT UNSIGNED NOT NULL,

    UNIQUE (code, company),
    CHECK (LENGTH(code) = 2),

    FOREIGN KEY (company) REFERENCES corporation.company (id) ON DELETE RESTRICT
) COMMENT 'InterContainer Codes';

CREATE TABLE IF NOT EXISTS dimension.endorsement
(
    id                     INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    tare                   INT UNSIGNED           NOT NULL COMMENT 'in kg',
    max_payload            INT UNSIGNED           NOT NULL COMMENT 'in kg',
    max_gross              INT UNSIGNED           NOT NULL COMMENT 'in kg',
    net_capacity           INT UNSIGNED           NOT NULL COMMENT 'in cum',
    stacking_capacity      INT UNSIGNED           NOT NULL COMMENT 'in kg',
    stacking_load          INT UNSIGNED           NOT NULL COMMENT 'per container in kg',
    transverse_racking     INT UNSIGNED           NOT NULL COMMENT 'in N',
    side_wall_strength     DECIMAL(3, 3) UNSIGNED NOT NULL COMMENT 'in P',
    end_wall_strength      DECIMAL(3, 3) UNSIGNED NOT NULL COMMENT 'in P',
    floor_strength         INT UNSIGNED           NOT NULL COMMENT 'in kg',
    manufacture_date       DATE                   NOT NULL,
    first_examination_date DATE                   NOT NULL,

    UNIQUE (tare, max_payload, max_gross, net_capacity, stacking_capacity, stacking_load, transverse_racking,
            side_wall_strength, end_wall_strength, floor_strength, manufacture_date, first_examination_date),

    CHECK (LENGTH(tare) <= 5),
    CHECK (LENGTH(max_payload) <= 5),
    CHECK (LENGTH(max_gross) <= 5),
    CHECK (LENGTH(net_capacity) <= 5),
    CHECK (LENGTH(stacking_capacity) <= 6),
    CHECK (LENGTH(stacking_load) <= 6),
    CHECK (LENGTH(transverse_racking) <= 6),
    CHECK (LENGTH(SUBSTRING_INDEX(side_wall_strength, '.', 1)) = 3 AND LENGTH(SUBSTRING_INDEX(side_wall_strength, '.', -1)) = 3),
    CHECK (LENGTH(SUBSTRING_INDEX(end_wall_strength, '.', 1)) = 3 AND LENGTH(SUBSTRING_INDEX(end_wall_strength, '.', -1)) = 3),
    CHECK (LENGTH(floor_strength) <= 6),
    CHECK (manufacture_date > '1900-01-01'),
    CHECK (first_examination_date > '1900-01-01')
) COMMENT 'LR standardized';

CREATE TABLE IF NOT EXISTS certificate.ccc
(
    id                         INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    prototype_serial_number    VARCHAR(25),
    approval_country           INT UNSIGNED NOT NULL,
    approval_reference         VARCHAR(25)  NOT NULL,
    ic                         INT UNSIGNED,
    size                       INT UNSIGNED NOT NULL,
    type                       INT UNSIGNED NOT NULL,
    owner                      INT UNSIGNED NOT NULL,
    owner_serial_number        VARCHAR(25)  NOT NULL,
    manufacturer               INT UNSIGNED NOT NULL,
    manufacturer_serial_number VARCHAR(25)  NOT NULL,
    manufacturer_model_number  VARCHAR(128) NOT NULL,
    manufacturer_type          VARCHAR(127) NOT NULL,
    endorsement                INT UNSIGNED NOT NULL,
    covered_containers         INT UNSIGNED NOT NULL,

    UNIQUE (prototype_serial_number, approval_country, approval_reference, ic, size, type, owner,
            owner_serial_number, manufacturer, manufacturer_serial_number, manufacturer_model_number,
            manufacturer_type, endorsement, covered_containers),

    CHECK (prototype_serial_number IS NULL OR
           (LENGTH(prototype_serial_number) <= 25 AND prototype_serial_number REGEXP '^[0-9]{2}[A-Z]{2} [0-9]{6}$')),
    CHECK (LENGTH(approval_reference) <= 25 AND approval_reference REGEXP '^[A-Z]/[A-Z]{2}/[0-9]{5}/[0-9]{2}$'),
    CHECK (LENGTH(owner_serial_number) <= 25 AND owner_serial_number REGEXP '^[A-Z]{4} [0-9]{6}$'),
    CHECK (LENGTH(manufacturer_serial_number) <= 25 AND
           manufacturer_serial_number REGEXP '^[0-9]{2}[A-Z]{2} [0-9]{6}$'),
    CHECK (LENGTH(manufacturer_model_number) <= 128 AND
           manufacturer_model_number REGEXP '^[A-Z]{2}-[0-9]{2}[A-Z]{2}-[A-Z]\([A-Z]{4}\)$'),
    CHECK (LENGTH(manufacturer_type) <= 127 AND
           manufacturer_type REGEXP '^\d{1,2}''\d{1,2}"x\d{1,2}''\d{1,2}"x\d{1,2}''\d{1,2}" \S{0,106}$'),
    CHECK (LENGTH(covered_containers) <= 6),

    FOREIGN KEY (approval_country) REFERENCES corporation.country (id) ON DELETE RESTRICT,
    FOREIGN KEY (ic) REFERENCES ic (id) ON DELETE RESTRICT,
    FOREIGN KEY (size) REFERENCES dimension.size (id) ON DELETE RESTRICT,
    FOREIGN KEY (type) REFERENCES dimension.type_code (id) ON DELETE RESTRICT,
    FOREIGN KEY (owner) REFERENCES corporation.company (id) ON DELETE RESTRICT,
    FOREIGN KEY (manufacturer) REFERENCES corporation.company (id) ON DELETE RESTRICT,
    FOREIGN KEY (endorsement) REFERENCES dimension.endorsement (id) ON DELETE RESTRICT
) COMMENT 'Container Construction Certificate';

CREATE TABLE IF NOT EXISTS certificate.csc
(
    id                    INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    csc_number            VARCHAR(25)  NOT NULL,
    ccc                   INT UNSIGNED NOT NULL,
    tct                   INT UNSIGNED NOT NULL,
    next_examination_date DATE         NOT NULL,
    acep                  INT UNSIGNED COMMENT 'Approved Continuous Examination Program',

    UNIQUE (csc_number, ccc, tct, next_examination_date, acep),

    CHECK (LENGTH(csc_number) <= 25 AND csc_number REGEXP '^[A-Z]{2}-[A-Z]{1,2}\s[0-9]{5}-[0,1][1-9]\/[1,2][0-9]{3}$'),
    CHECK (next_examination_date > '1900-01-01'),
    CHECK (LENGTH(acep) <= 5),

    FOREIGN KEY (ccc) REFERENCES ccc (id) ON DELETE RESTRICT,
    FOREIGN KEY (tct) REFERENCES tct (id) ON DELETE RESTRICT
) COMMENT 'International Convention for Save Containers';

CREATE TABLE IF NOT EXISTS configuration.container
(
    id                                 INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    serial_number                      INT UNSIGNED NOT NULL,
    check_digit                        INT UNSIGNED NOT NULL,
    csc                                INT UNSIGNED NOT NULL,
    equipment_identifier               INT UNSIGNED NOT NULL,
    overhead_electrical_danger_warning BOOLEAN      NOT NULL,
    repair_recommendation              VARCHAR(511),

    UNIQUE (serial_number, check_digit, csc, equipment_identifier, overhead_electrical_danger_warning,
            repair_recommendation),

    CHECK (LENGTH(serial_number) <= 6),
    CHECK (LENGTH(check_digit) = 1),
    CHECK (LENGTH(repair_recommendation) <= 511),

    FOREIGN KEY (csc) REFERENCES certificate.csc (id) ON DELETE RESTRICT,
    FOREIGN KEY (equipment_identifier) REFERENCES dimension.equipment_identifier (id) ON DELETE RESTRICT
);