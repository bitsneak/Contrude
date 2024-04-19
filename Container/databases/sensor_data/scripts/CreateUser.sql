CREATE ROLE IF NOT EXISTS 'admin', 'developer';

CREATE USER IF NOT EXISTS 'BitSneak'@'%'
    IDENTIFIED WITH caching_sha2_password BY '123'
    DEFAULT ROLE admin
    REQUIRE NONE -- only debug
--    REQUIRE SSL
    PASSWORD EXPIRE
    PASSWORD HISTORY 5;