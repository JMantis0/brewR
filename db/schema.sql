DROP DATABASE IF EXISTS brewr;

CREATE DATABASE brewr;

USE brewr;

CREATE TABLE brewerybeers(
	id int NOT NULL AUTO_INCREMENT,
	beername VARCHAR(255) NOT NULL,
    beerstyle VARCHAR(255) NOT NULL,
    beerabv DECIMAL(10) NOT NULL,
    beerhops VARCHAR(10) NOT NULL,
    createdAt DATETIME NOT NULL,
    updatedAt DATETIME NOT NULL,
	PRIMARY KEY (id)
);

CREATE TABLE posts (
	id int NOT NULL AUTO_INCREMENT,
    body VARCHAR(255) NOT NULL, 
	createdAt DATETIME NOT NULL,
    updatedAt DATETIME NOT NULL,
    UserID INT(10) NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE users (
	id int NOT NULL AUTO_INCREMENT,
    email VARCHAR(255) NOT NULL, 
    password VARCHAR(255) NOT NULL, 
	usertype VARCHAR(255) NOT NULL, 
    createdAt DATETIME NOT NULL,
    updatedAt DATETIME NOT NULL,
    UserID INT(10) NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE faves (
	id int NOT NULL AUTO_INCREMENT,
    brewer_id VARCHAR(255) NOT NULL, 
    name VARCHAR(255) NOT NULL, 
	brewery_type VARCHAR(255) NOT NULL,
	street VARCHAR(255) NOT NULL,
    city VARCHAR(255) NOT NULL,
    state VARCHAR(255) NOT NULL,
    postal_code VARCHAR(255) NOT NULL,
    country VARCHAR(255) NOT NULL,
    phone VARCHAR(255) NOT NULL,
    website VARCHAR(255) NOT NULL,
    createdAt DATETIME NOT NULL,
    updatedAt DATETIME NOT NULL,
    PRIMARY KEY (id)
);
