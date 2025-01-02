GRANT ALL PRIVILEGES ON *.* TO 'admin' WITH GRANT OPTION;

GRANT ALL PRIVILEGES ON container.* TO 'developer';
GRANT ALL PRIVILEGES ON certificate.* TO 'developer';
GRANT ALL PRIVILEGES ON corporation.* TO 'developer';
GRANT ALL PRIVILEGES ON dimension.* TO 'developer';

GRANT SELECT, UPDATE ON container.* TO 'api';
GRANT SELECT, UPDATE ON certificate.* TO 'api';
GRANT SELECT, UPDATE ON corporation.* TO 'api';
GRANT SELECT, UPDATE ON dimension.* TO 'api';

FLUSH PRIVILEGES;