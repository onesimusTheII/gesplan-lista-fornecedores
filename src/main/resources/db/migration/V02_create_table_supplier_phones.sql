CREATE TABLE SupplierPhones
(
    id          BIGINT PRIMARY KEY AUTO_INCREMENT,
    supplier_id BIGINT      NOT NULL,
    phone       VARCHAR(20) NOT NULL,
    FOREIGN KEY (supplier_id) REFERENCES Supplier (id)
);