USE management;

CREATE TABLE CUSTOMER (
	id int primary key auto_increment,
    image varchar(1024),
    name varchar(64),
    birthday varchar(64),
    gender varchar(64),
    job varchar(64)
) DEFAULT CHARACTER SET UTF8 COLLATE utf8_general_ci;

SELECT HOST, USER, PLUGIN, AUTHENTICATION_STRING FROM mysql.user;

ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'password';