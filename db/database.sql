CREATE DATABASE IF NOT EXISTS company;

USE company;

CREATE TABLE product (  
product_id int (11) AUTO_INCREMENT,  
product_name varchar (150) DEFAULT NULL,  
product_imagen varchar (500) DEFAULT NULL, 
product_precio decimal (10,2) DEFAULT NULL,
product_descripcion varchar (500) DEFAULT NULL,
product_cantidad decimal (10,2) DEFAULT NULL,
category_id int (11),
PRIMARY KEY (product_id)
FOREIGN KEY (product_id) REFERENCES category(category_id)
);

CREATE TABLE category (  
category_id int (11) AUTO_INCREMENT,  
category_name varchar (150) DEFAULT NULL,  
category_imagen varchar (500) DEFAULT NULL, 
category_descripcion varchar (500) DEFAULT NULL,
PRIMARY KEY (category_id)
);

CREATE TABLE purchase (
purchase_id int (11) AUTO_INCREMENT,   
cliente varchar (150) DEFAULT NULL,  
montototal decimal (10,2) DEFAULT NULL,  
fecha datetime DEFAULT NULL, 
PRIMARY KEY (purchase_id)
);

CREATE TABLE purchaseDetails (
purchase_id int (11),   
producto int (11) DEFAULT NULL,  
cantidad decimal (10,2) DEFAULT NULL,  
subototal decimal (10,2) DEFAULT NULL, 
precio decimal (10,2) DEFAULT NULL, 
descuento decimal (10,2) DEFAULT NULL,
FOREIGN KEY (purchase_id) REFERENCES purchase(purchase_id)
);
