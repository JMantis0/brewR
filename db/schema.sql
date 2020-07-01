DROP DATABASE IF EXISTS brewr;

CREATE DATABASE brewr;

USE brewr;

CREATE TABLE brewr_user (
	id int NOT NULL AUTO_INCREMENT,
	first_name varchar(255) NOT NULL,
    last_name varchar(255) NOT NULL,
    user_name varchar(255) NOT NULL,
    email varchar(255) NOT NULL,
	PRIMARY KEY (id)
);

CREATE TABLE brewery_name(
	id int NOT NULL AUTO_INCREMENT,
	brewery_name VARCHAR(255) NOT NULL,
    brewery_address VARCHAR(255) NOT NULL,
    brewery_state VARCHAR(255) NOT NULL,
    brewery_zip VARCHAR(10) NOT NULL,
    contact_phone VARCHAR(20) NOT NULL,
    contact_email VARCHAR(255) NOT NULL,
	PRIMARY KEY (id)
);


