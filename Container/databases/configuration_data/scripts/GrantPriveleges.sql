GRANT ALL PRIVILEGES ON *.* TO 'admin' WITH GRANT OPTION;

GRANT ALL PRIVILEGES ON configuration.* TO 'developer';
GRANT ALL PRIVILEGES ON certificate.* TO developer;
GRANT ALL PRIVILEGES ON corporation.* TO 'developer';
GRANT ALL PRIVILEGES ON dimension.* TO 'developer';

GRANT SELECT ON configuration.* TO 'api_get';
GRANT SELECT ON certificate.* TO api_get;
GRANT SELECT ON corporation.* TO 'api_get';
GRANT SELECT ON dimension.* TO 'api_get';

FLUSH PRIVILEGES;