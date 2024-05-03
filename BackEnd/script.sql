CREATE DATABASE IF NOT EXISTS `Inventory`;
USE `Inventory`;

CREATE TABLE IF NOT EXISTS `Category` (
    Id INT NOT NULL AUTO_INCREMENT,
    Name VARCHAR(50) NOT NULL,
    CreatedAt datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
    UpdatedAt datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    CONSTRAINT PkCategory PRIMARY KEY (Id)
);

CREATE TABLE IF NOT EXISTS `Product` (
    Id INT NOT NULL AUTO_INCREMENT,
    Code VARCHAR(50) NOT NULL,
    Name VARCHAR(50) NOT NULL,
    Price FLOAT(10,2) NOT NULL,
    CategoryId INT NOT NULL,
    CreatedAt datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
    UpdatedAt datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    CONSTRAINT UqCode UNIQUE (Code),
    CONSTRAINT PkProduct PRIMARY KEY (Id),
    CONSTRAINT FkCategory FOREIGN KEY (CategoryId) REFERENCES Category(Id)
);