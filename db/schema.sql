DROP DATABASE IF EXISTS brewr;

CREATE DATABASE brewr;

USE brewr;

-- members table is for blog posts
CREATE TABLE members (
	id int NOT NULL AUTO_INCREMENT,
    post VARCHAR (255) NOT NULL, 
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



