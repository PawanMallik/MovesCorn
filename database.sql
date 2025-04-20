-- CREATE DATABASE movie_requests;

-- CREATE TABLE users (
--     id INT AUTO_INCREMENT PRIMARY KEY,
--     username VARCHAR(50) NOT NULL UNIQUE,
--     email VARCHAR(100) NOT NULL UNIQUE,
--     password VARCHAR(255) NOT NULL,
--     time 
    
-- );


-- CREATE TABLE movie_requests (
--     id INT AUTO_INCREMENT PRIMARY KEY,
--     full_name VARCHAR(100) NOT NULL,
--     email VARCHAR(100) NOT NULL,
--     movie_name VARCHAR(100) NOT NULL,
--     note TEXT
-- );


-- Create the database
-- CREATE DATABASE movie_requests;
-- USE movie_requests;

-- Create users table
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    time TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create movie_requests table
CREATE TABLE movie_requests (
    id INT AUTO_INCREMENT PRIMARY KEY,
    full_name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL,
    movie_name VARCHAR(100) NOT NULL,
    note TEXT,
    time TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
