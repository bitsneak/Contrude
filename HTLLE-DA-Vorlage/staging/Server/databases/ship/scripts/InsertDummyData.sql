-- corporation.continent
INSERT INTO corporation.continent (name)
VALUES ('Africa'),
       ('Asia'),
       ('Europe'),
       ('North America'),
       ('South America'),
       ('Australia'),
       ('Antarctica');

-- corporation.country
INSERT INTO corporation.country (name, continent, abbreviation)
VALUES ('United States', 4, 'US'),
       ('Germany', 3, 'DE'),
       ('China', 2, 'CN'),
       ('Brazil', 5, 'BR'),
       ('Australia', 6, 'AU');

-- corporation.company
INSERT INTO corporation.company (name, country, abbreviation, is_owner, is_operator)
VALUES ('Maersk Line', 2, 'ML', 1, 1),
       ('MSC Cruises', 3, 'MSC', 1, 1),
       ('COSCO Shipping', 3, 'COSCO', 1, 0),
       ('K Line', 2, 'KLINE', 0, 1),
       ('Evergreen Marine', 2, 'EVER', 1, 1);

-- ship.type
INSERT INTO ship.type (name)
VALUES ('Container Ship'),
       ('Oil Tanker'),
       ('Bulk Carrier'),
       ('Passenger Ship');

-- ship.ship
INSERT INTO ship.ship (name, imo_number, registration_country, type, length, width, draft, net_capacity,
                       cargo_capacity,
                       container_capacity, owner, operator, year_built)
VALUES ('Emma Maersk', 'IMO1234567', 2, 1, 397.00, 56.00, 14.50, 151687.00, 165000.00, 11000, 1, 1,
        2006),                                                                                            -- Container Ship
       ('Ever Given', 'IMO7654321', 2, 1, 399.94, 58.80, 14.50, 221200.00, 202200.00, 20124, 5, 5,
        2018),                                                                                            -- Container Ship
       ('Triton Pioneer', 'IMO2345678', 4, 2, 250.00, 45.00, 12.00, 105000.00, 110000.00, 0, 3, 4, 2015), -- Oil Tanker
       ('Glorious Voyager', 'IMO8765432', 3, 3, 230.00, 38.00, 10.00, 85000.00, 120000.00, 0, 4, 4, 2012);
-- Bulk Carrier

-- certificate.type
INSERT INTO certificate.type (name, abbreviation)
VALUES ('International Load Line Certificate', 'ILLC'),
       ('International Oil Pollution Prevention', 'IOPP'),
       ('Ballast Water Management', 'BWMC'),
       ('International Air Pollution Prevention', 'IAPP'),
       ('Safety Management Certificate', 'SMC');

-- certificate.status
INSERT INTO certificate.status (name)
VALUES ('Valid'),
       ('Expired'),
       ('Pending Renewal'),
       ('Revoked');

-- certificate.general_certificate
INSERT INTO certificate.general_certificate (ship, type, issuing_authority, issue_date, expiry_date, status, notes)
VALUES (1, 1, 'Lloyd\'s Register', '2020-01-01', '2025-01-01', 1,
        'Issued by Lloyd\'s Register for compliance with load line regulations.'),
       (2, 2, 'DNV GL', '2019-06-15', '2024-06-15', 1, 'Issued by DNV GL for oil pollution prevention compliance.');

-- certificate.load_line_zone
INSERT INTO certificate.load_line_zone (name)
VALUES ('Tropical'),
       ('Summer'),
       ('Winter'),
       ('Winter North Atlantic');

-- certificate.illc
INSERT INTO certificate.illc (certificate, load_line_zone, freeboard_measurement)
VALUES (1, 2, 8.00),
       (1, 3, 9.00);

-- certificate.equipment_type
INSERT INTO certificate.equipment_type (name)
VALUES ('Oil Filtering Equipment'),
       ('Bilge Separator'),
       ('Sludge Tank');

-- certificate.disposal_method
INSERT INTO certificate.disposal_method (name)
VALUES ('Incineration'),
       ('Offloading to Shore Facility'),
       ('Discharge to Sea (Regulated)');

-- certificate.iopp
INSERT INTO certificate.iopp (certificate, equipment_type, disposal_methode)
VALUES (2, 1, 2),
       (2, 2, 1);

-- certificate.treatment_system
INSERT INTO certificate.treatment_system (name)
VALUES ('UV Ballast Treatment'),
       ('Chlorination System');

-- certificate.bwmc
INSERT INTO certificate.bwmc (certificate, treatment_system)
VALUES (1, 1),
       (2, 2);

-- certificate.iapp
INSERT INTO certificate.iapp (certificate, sox_compliance, nox_compliance)
VALUES (1, TRUE, TRUE),
       (2, TRUE, FALSE);

-- certificate.smc
INSERT INTO certificate.smc (certificate, audit_results)
VALUES (1, 'Passed all safety management audits for 2020.'),
       (2, 'Minor issues in emergency protocols, resolved.');
