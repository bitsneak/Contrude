GRANT ALL PRIVILEGES ON *.* TO 'admin' WITH GRANT OPTION;

GRANT ALL PRIVILEGES ON configuration.* TO 'developer';
GRANT ALL PRIVILEGES ON certificate.* TO developer;
GRANT ALL PRIVILEGES ON corporation.* TO 'developer';
GRANT ALL PRIVILEGES ON dimension.* TO 'developer';

FLUSH PRIVILEGES;