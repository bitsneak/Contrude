CREATE DATABASE IF NOT EXISTS measurements DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_bin;

USE measurements;

CREATE TABLE IF NOT EXISTS measurements.data
(
    id           INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    container_id INT UNSIGNED                       NOT NULL,
    temperature  DECIMAL(5, 2) UNSIGNED             NOT NULL COMMENT 'in celsius',
    humidity     INT UNSIGNED                       NOT NULL COMMENT 'in percentage',
    air_pressure DECIMAL(6, 3) UNSIGNED             NOT NULL COMMENT 'in pa',
    vibration    INT UNSIGNED                       NOT NULL COMMENT 'in mm/s',
    latitude     DECIMAL(7, 5)                      NOT NULL COMMENT 'in m',
    longitude    DECIMAL(8, 5)                      NOT NULL COMMENT 'in m',
    altitude     INT                                NOT NULL COMMENT 'in m',
    timestamp    DATETIME DEFAULT CURRENT_TIMESTAMP NOT NULL COMMENT 'UTC',

    UNIQUE (container_id, timestamp),

    CHECK (LENGTH(SUBSTRING_INDEX(temperature, '.', 1)) <= 3 AND LENGTH(SUBSTRING_INDEX(temperature, '.', -1)) = 2),
    CHECK (humidity BETWEEN 0 AND 100),
    CHECK (LENGTH(SUBSTRING_INDEX(air_pressure, '.', 1)) <= 3 AND LENGTH(SUBSTRING_INDEX(air_pressure, '.', -1)) = 3),
    CHECK (LENGTH(vibration) <= 5),
    CHECK (LENGTH(SUBSTRING_INDEX(latitude, '.', 1)) <= 2 AND LENGTH(SUBSTRING_INDEX(latitude, '.', -1)) = 5),
    CHECK (LENGTH(SUBSTRING_INDEX(longitude, '.', 1)) <= 3 AND LENGTH(SUBSTRING_INDEX(longitude, '.', -1)) = 5),
    CHECK (LENGTH(altitude) <= 3)
);