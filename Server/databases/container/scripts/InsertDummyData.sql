INSERT INTO certificate.tct VALUES (NULL, 'Basileum');
INSERT INTO certificate.tct VALUES (NULL, 'Radaleum');
INSERT INTO certificate.tct VALUES (NULL, 'Talileum-400');

INSERT INTO corporation.continent VALUES (NULL, 'Europe');
INSERT INTO corporation.continent VALUES (NULL, 'Asia');
INSERT INTO corporation.continent VALUES (NULL, 'Africa');
INSERT INTO corporation.continent VALUES (NULL, 'North america');
INSERT INTO corporation.continent VALUES (NULL, 'Australia');
INSERT INTO corporation.continent VALUES (NULL, 'South america');
INSERT INTO corporation.continent VALUES (NULL, 'Antarctica');

INSERT INTO dimension.equipment_identifier VALUES (NULL, 'U', 'all freight containers');
INSERT INTO dimension.equipment_identifier VALUES (NULL, 'J', 'detachable freight container-related equipment');
INSERT INTO dimension.equipment_identifier VALUES (NULL, 'Z', 'trailers and chassis');

INSERT INTO dimension.size VALUES (NULL, '2', '2');
INSERT INTO dimension.size VALUES (NULL, 'M', '5');
INSERT INTO dimension.size VALUES (NULL, 'K', '7a');

INSERT INTO corporation.country VALUES (NULL, 'Italy', 1, 'IT');
INSERT INTO corporation.country VALUES (NULL, 'USA', 4, 'US');
INSERT INTO corporation.country VALUES (NULL, 'China', 2, 'CN');
INSERT INTO corporation.country VALUES (NULL, 'Austria', 1, 'AT');
INSERT INTO corporation.country VALUES (NULL, 'Great Britain', 1, 'GB');

INSERT INTO dimension.type_code VALUES (NULL, 'G', 'General purpose container without ventilation', 'GP', 'Passive vents at upper part of cargo space', 'G1', 'GB');
INSERT INTO dimension.type_code VALUES (NULL, 'R', 'Thermal container', 'RH', 'Heated', 'R7', 'RW');
INSERT INTO dimension.type_code VALUES (NULL, 'A', 'Air/ surface container', 'AS', NULL, 'A0', NULL);

-- owners
INSERT INTO corporation.company VALUES (NULL, NULL, 'W&K Container Inc.', 'W&K', 2, TRUE, FALSE);
INSERT INTO corporation.company VALUES (NULL, 'MSC', 'Mediterranean Shipping Company', 'MSC', 1, FALSE, TRUE);
INSERT INTO corporation.company VALUES (NULL, 'OBB', 'Österreichische Bundesbahnen', 'ÖBB', 4, FALSE, TRUE);
-- manufacturers
INSERT INTO corporation.company VALUES (NULL, 'BSL', 'BSL Containers Ltd.', 'BSL Containers', 3, TRUE, TRUE);
INSERT INTO corporation.company VALUES (NULL, 'TEX', 'Textainer Group Holdings', 'Textainer', 1, TRUE, TRUE);
INSERT INTO corporation.company VALUES (NULL, 'CMA', 'CMA CGM', 'CMA Containers', 1, TRUE, TRUE);
INSERT INTO corporation.company VALUES (NULL, 'COS', 'COSCO Shipping', 'COSCO', 2, TRUE, TRUE);
INSERT INTO corporation.company VALUES (NULL, 'MAE', 'Maersk Line', 'Maersk', 3, TRUE, TRUE);

INSERT INTO certificate.ic VALUES (NULL, 81, 4);

INSERT INTO dimension.endorsement VALUES (NULL, 2185, 28295, 30480, 33.2, 192000, 86400, 150000, 0.5, 0.4, 7260, '2020-01-01', '2025-01-01');
INSERT INTO dimension.endorsement VALUES (NULL, 3660, 28840, 32500, 67.6, 216000, 72000, 150000, 0.7, 1.12, 89327, '2022-06-01', '2027-06-01');

INSERT INTO certificate.ccc VALUES (NULL, 'SHI1981924-3', 5, 'GB/C 18001 LR/2019', NULL, 1, 1, 3, 'BSLU 800392', 3, NULL, '19SB 226716', 'SP-20DV-B(EODL)', '0\'20"x8\'0"x8\'6" Type Steel Dry Cargo Container', 1, 2);

INSERT INTO certificate.csc VALUES (NULL, 'GB-LR 25182-09/2019', 1, 3, '2030-01-01', NULL);
INSERT INTO certificate.csc VALUES (NULL, 'FR-BV 15018-06/2021', 1, 3, '2032-06-01', 4526);

-- Ship 1: 9 containers
INSERT INTO container.container VALUES (NULL, 1, 100001, 1, 1, 1, FALSE, 'Routine checks required');
INSERT INTO container.container VALUES (NULL, 1, 100002, 2, 2, 2, TRUE, 'Repair internal damage before use');
INSERT INTO container.container VALUES (NULL, 1, 100003, 3, 1, 3, FALSE, NULL);
INSERT INTO container.container VALUES (NULL, 1, 100004, 4, 2, 1, TRUE, NULL);
INSERT INTO container.container VALUES (NULL, 1, 100005, 5, 1, 2, FALSE, 'Minor corrosion at the base');
INSERT INTO container.container VALUES (NULL, 1, 100006, 6, 2, 3, TRUE, NULL);
INSERT INTO container.container VALUES (NULL, 1, 100007, 7, 1, 2, FALSE, NULL);
INSERT INTO container.container VALUES (NULL, 1, 100008, 8, 2, 1, TRUE, 'Check structural integrity');
INSERT INTO container.container VALUES (NULL, 1, 100009, 9, 1, 3, FALSE, NULL);

-- Ship 2: 8 containers
INSERT INTO container.container VALUES (NULL, 2, 200001, 1, 2, 2, TRUE, 'Inspect locking mechanisms');
INSERT INTO container.container VALUES (NULL, 2, 200002, 2, 1, 1, FALSE, NULL);
INSERT INTO container.container VALUES (NULL, 2, 200003, 3, 2, 3, TRUE, 'Handle with care: fragile cargo');
INSERT INTO container.container VALUES (NULL, 2, 200004, 4, 1, 2, FALSE, 'Inspect door seals for leaks');
INSERT INTO container.container VALUES (NULL, 2, 200005, 5, 2, 1, TRUE, NULL);
INSERT INTO container.container VALUES (NULL, 2, 200006, 6, 1, 3, FALSE, 'Ensure weight limits are not exceeded');
INSERT INTO container.container VALUES (NULL, 2, 200007, 7, 2, 2, TRUE, 'Repaint external walls');
INSERT INTO container.container VALUES (NULL, 2, 200008, 8, 1, 1, FALSE, NULL);

-- Ship 3: 7 containers
INSERT INTO container.container VALUES (NULL, 3, 300001, 1, 2, 3, FALSE, 'Scheduled maintenance required');
INSERT INTO container.container VALUES (NULL, 3, 300002, 2, 1, 1, TRUE, NULL);
INSERT INTO container.container VALUES (NULL, 3, 300003, 3, 2, 2, FALSE, 'Verify temperature control systems');
INSERT INTO container.container VALUES (NULL, 3, 300004, 4, 1, 3, TRUE, 'Reinforce base panels');
INSERT INTO container.container VALUES (NULL, 3, 300005, 5, 2, 1, FALSE, NULL);
INSERT INTO container.container VALUES (NULL, 3, 300006, 6, 1, 2, TRUE, 'Inspect hinges for rust');
INSERT INTO container.container VALUES (NULL, 3, 300007, 7, 2, 3, FALSE, NULL);

-- Ship 4: 6 containers
INSERT INTO container.container VALUES (NULL, 4, 400001, 1, 1, 2, TRUE, 'Scheduled cleaning required');
INSERT INTO container.container VALUES (NULL, 4, 400002, 2, 2, 1, FALSE, NULL);
INSERT INTO container.container VALUES (NULL, 4, 400003, 3, 1, 3, TRUE, 'Inspect corner posts for damage');
INSERT INTO container.container VALUES (NULL, 4, 400004, 4, 2, 2, FALSE, 'Replace damaged flooring');
INSERT INTO container.container VALUES (NULL, 4, 400005, 5, 1, 1, TRUE, 'Check refrigeration unit');
INSERT INTO container.container VALUES (NULL, 4, 400006, 6, 2, 3, FALSE, NULL);
