CREATE DATABASE IF NOT EXISTS measurements DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci;

USE measurements;

-- TODO nothing is ready

CREATE TABLE IF NOT EXISTS measurements.gps
(
    id INT(255) UNSIGNED PRIMARY KEY AUTO_INCREMENT

);

CREATE TABLE IF NOT EXISTS measurements.data
(
    id           INT(255) UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    container_id INT(255) UNSIGNED      NOT NULL,
    temperature  DECIMAL(3, 2) UNSIGNED NOT NULL COMMENT 'in celsius',
    humidity     TINYINT(3) UNSIGNED    NOT NULL COMMENT 'in percentage',
    pressure     DECIMAL(4, 2) UNSIGNED NOT NULL COMMENT 'in mbar',
    position     INT(255) UNSIGNED      NOT NULL,
    vibration    SMALLINT(5) UNSIGNED   NOT NULL COMMENT 'in ...',
    date         DATE                   NOT NULL,
    time         TIME                   NOT NULL,

    FOREIGN KEY (position) REFERENCES gps (id),
    UNIQUE (container_id, date, time)
);