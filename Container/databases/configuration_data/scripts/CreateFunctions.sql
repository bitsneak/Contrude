DELIMITER $$

CREATE FUNCTION certificate.validate_ccc(
    prototype_serial_number VARCHAR(25),
    approval_reference VARCHAR(25),
    owner_serial_number VARCHAR(25),
    manufacturer_serial_number VARCHAR(25),
    manufacturer_model_number VARCHAR(128),
    manufacturer_type VARCHAR(25)
)
    RETURNS BOOLEAN
BEGIN
    SET @prototype_serial_number_regex = '^[0-9]{2}[A-Z]{2}\s[0-9]{6}$';
    SET @approval_reference_regex = '^[A-Z]{1}/[A-Z]{2}/[0-9]{5}/[0-9]{2}$';
    SET @owner_serial_number_regex = '^[A-Z]{4}\s[0-9]{6}$';
    SET @manufacturer_serial_number_regex = '^[0-9]{2}[A-Z]{2}\s[0-9]{6}$';
    SET @manufacturer_model_number_regex = '^[A-Z]{2}-[0-9]{2}[A-Z]{2}-[A-Z]{1}\([A-Z]{4}\)$';
    SET @manufacturer_type_regex = '^\d{1,2}''\d{1,2}"x\d{1,2}''\d{1,2}"x\d{1,2}''\d{1,2}"\s[a-zA-Z\s]{0,112}$';

    IF prototype_serial_number REGEXP @prototype_serial_number_regex = 0 THEN
        RETURN FALSE;
    ELSEIF approval_reference REGEXP @approval_reference_regex = 0 THEN
        RETURN FALSE;
    ELSEIF owner_serial_number REGEXP @owner_serial_number_regex = 0 THEN
        RETURN FALSE;
    ELSEIF manufacturer_serial_number REGEXP @manufacturer_serial_number_regex = 0 THEN
        RETURN FALSE;
    ELSEIF manufacturer_model_number REGEXP @manufacturer_model_number_regex = 0 THEN
        RETURN FALSE;
    ELSEIF manufacturer_type REGEXP @manufacturer_type_regex = 0 THEN
        RETURN FALSE;
    END IF;

    RETURN TRUE;
END $$

CREATE FUNCTION certificate.validate_csc(
    csc_number VARCHAR(25)
)
    RETURNS BOOLEAN
BEGIN
    SET @csc_number_regex = '^[A-Z]{2}-[A-Z]{1,2}\s[0-9]{5}-[0,1][1-9]\/[1,2][0-9]{3}$';

    IF csc_number REGEXP @csc_number_regex = 0 THEN
        RETURN FALSE;
    END IF;

    RETURN TRUE;
END $$

DELIMITER ;