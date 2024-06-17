-- Inserindo dados na tabela Supplier
INSERT INTO Supplier (id, name, email, type, observation, favorite)
VALUES (1, 'Giacomo Guilizzoni', 'giacomo.guilizzoni@gmail.com', 'Fabricante', '', 0),
       (2, 'Marco Botton', 'marco.botton@gmail.com', 'Atacadista', 'Ligar', 0),
       (3, 'Mariah Maclachlan', 'mariah.maclachlan@gmail.com', 'Distribuidor', '', 0),
       (4, 'Valerie Liberty', 'valerie.liberty@gmail.com', 'Varejista', 'Remover', 0);

-- Inserindo dados na tabela SupplierPhones
INSERT INTO SupplierPhones (supplier_id, phone)
VALUES (1, '(47) 9 9202-2032'),
       (2, '(82) 5540-3930'),
       (3, '(48) 8203-2392'),
       (4, '(11) 9 1192-2923');