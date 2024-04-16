DELIMITER $$

CREATE TRIGGER certificate.before_ccc_insert
    BEFORE INSERT
    ON certificate.ccc
    FOR EACH ROW
BEGIN
    IF NOT certificate.validate_certificate_ccc(
            NEW.prototype_serial_number,
            NEW.approval_reference,
            NEW.owner_serial_number,
            NEW.manufacturer_serial_number,
            NEW.manufacturer_model_number,
            NEW.manufacturer_type
        ) THEN
        SIGNAL SQLSTATE '45000'
            SET MESSAGE_TEXT = 'One or more fields do not match the required pattern';
    END IF;
END $$

CREATE TRIGGER certificate.before_ccc_update
    BEFORE UPDATE
    ON certificate.ccc
    FOR EACH ROW
BEGIN
    IF NOT certificate.validate_certificate_ccc(
            NEW.prototype_serial_number,
            NEW.approval_reference,
            NEW.owner_serial_number,
            NEW.manufacturer_serial_number,
            NEW.manufacturer_model_number,
            NEW.manufacturer_type
        ) THEN
        SIGNAL SQLSTATE '45000'
            SET MESSAGE_TEXT = 'One or more fields do not match the required pattern';
    END IF;
END $$

CREATE TRIGGER certificate.before_csc_insert
    BEFORE INSERT
    ON certificate.csc
    FOR EACH ROW
BEGIN
    IF NOT certificate.validate_certificate_csc(
            NEW.csc_number
        ) THEN
        SIGNAL SQLSTATE '45000'
            SET MESSAGE_TEXT = 'csc_number does not match the required pattern';
    END IF;
END $$

CREATE TRIGGER certificate.before_csc_update
    BEFORE UPDATE
    ON certificate.csc
    FOR EACH ROW
BEGIN
    IF NOT certificate.validate_certificate_csc(
            NEW.csc_number
        ) THEN
        SIGNAL SQLSTATE '45000'
            SET MESSAGE_TEXT = 'csc_number does not match the required pattern';
    END IF;
END $$

DELIMITER ;