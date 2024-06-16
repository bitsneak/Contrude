GRANT ALL PRIVILEGES ON *.* TO 'admin' WITH GRANT OPTION;
GRANT ALL PRIVILEGES ON measurements.data TO 'developer';
GRANT SELECT ON measurements.data TO 'api';

FLUSH PRIVILEGES;