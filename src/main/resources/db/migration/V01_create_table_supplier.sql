CREATE TABLE Supplier
(
    id          BIGINT PRIMARY KEY AUTO_INCREMENT,
    name        VARCHAR(255) NOT NULL,
    email       VARCHAR(255) NOT NULL,
    type        VARCHAR(50)  NOT NULL,
    observation TEXT,
    favorite    BIT
);