DROP DATABASE IF EXISTS nodelogin;
CREATE DATABASE nodelogin;
USE nodelogin;

-- Create the table plans.
CREATE TABLE accounts
(
id int NOT NULL AUTO_INCREMENT,
username varchar(255) NOT NULL,
password VARCHAR(50) NOT NULL,
PRIMARY KEY (id)
);

-- Insert a set of records.
INSERT INTO accounts (username) VALUES ('TEST1234');