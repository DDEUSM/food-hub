CREATE SCHEMA "stock";

CREATE TABLE "record_status" (
  "id" integer PRIMARY KEY,
  "name" varchar(15)
);

CREATE TABLE "users" (
  "id" char(26) PRIMARY KEY,
  "name" varchar(70) NOT NULL,  
  "email" varchar(75) NOT NULL UNIQUE,
  "created_at" timestamp NOT NULL,
  "edited_at" timestamp  
);

CREATE TABLE "product_categories" (
  "id" CHAR(26) PRIMARY KEY,
  "name" VARCHAR(70) NOT NULL,
  "products_count" INTEGER NOT NULL,
  "created_at" timestamp NOT NULL
);

CREATE TABLE "products" (
  "id" CHAR(26) PRIMARY KEY,
  "category_id" CHAR(26) NOT NULL,
  "name" VARCHAR(70) NOT NULL,
  "image_url" VARCHAR(100),
  "description" TEXT,
  "current_price" decimal(10,2) NOT NULL,
  "record_status_id" integer NOT NULL,
  "sizes" integer[] ,
  "created_at" timestamp NOT NULL,
  "created_by" CHAR(26) NOT NULL,
  "edited_at" timestamp,
  "edited_by" char(26)
);

CREATE TABLE "complement_products" (
  "id" CHAR(26) PRIMARY KEY,
  "product_id" CHAR(26) NOT NULL,
  "complement_id" CHAR(26) NOT NULL,
  "obrigatory" bool NOT NULL
);

CREATE TABLE "complement_categories" (
  "id" CHAR(26) PRIMARY KEY,
  "name" VARCHAR(70) NOT NULL
);

CREATE TABLE "complements" (
  "id" CHAR(26) PRIMARY KEY,
  "category_id" CHAR(26) NOT NULL,
  "name" VARCHAR(70) NOT NULL,
  "image_url" VARCHAR(100),
  "current_price" decimal(10,2) NOT NULL
);

CREATE TABLE "complement_resource_requirements" (
  "id" CHAR(26) PRIMARY KEY,
  "complement_id" CHAR(26) NOT NULL,
  "resource_id" CHAR(26) NOT NULL,
  "quantity_required" FLOAT NOT NULL
);

CREATE TABLE "sizes_coeficient" (
  "id" integer PRIMARY KEY,
  "value" float,
  "edited_at" timestamp,
  "edited_by" CHAR(26),
  "created_at" timestamp,
  "created_by" CHAR(26)
);

CREATE TABLE "product_resource_requirements" (
  "id" CHAR(26) PRIMARY KEY,
  "product_id" char(26) NOT NULL,
  "resource_id" char(26) NOT NULL,
  "quantity_required" float NOT NULL,
  "unit_id" integer NOT NULL,
  "created_at" timestamp NOT NULL,
  "created_by" char(26) NOT NULL,
  "edited_at" timestamp,
  "edited_by" char(26)
);

CREATE TABLE "resources" (
  "id" char(26) PRIMARY KEY,
  "name" varchar(70) NOT NULL,
  "quantity" float NOT NULL,
  "average_cost_per_unit" decimal(10,2) NOT NULL,
  "unit_id" integer NOT NULL,
  "last_entry_at" timestamp
);

CREATE TABLE "currency_types" (
  "id" integer PRIMARY KEY,
  "name" varchar(10),
  "symbol" varchar(5)
);

CREATE TABLE "unit_types" (
  "id" integer PRIMARY KEY,
  "name" varchar(15),
  "symbol" varchar(3)
);

CREATE TABLE "payment_methods" (
  "id" SERIAL PRIMARY KEY,
  "name" VARCHAR(50) NOT NULL,
  "max_installments" integer NOT NULL
);

CREATE TABLE "payment" (
  "id" CHAR(26) PRIMARY KEY,
  "payment_method_id" integer NOT NULL,
  "installments_value" integer NOT NULL,
  "installments_count" integer NOT NULL,
  "installment_diff" integer NOT NULL,
  "transaction_id" VARCHAR(60),
  "paid_at" timestamp
);

CREATE TABLE "orders" (
  "id" CHAR(26) PRIMARY KEY,
  "customer_id" CHAR(26),
  "payment_id" CHAR(26),
  "created_at" timestamp NOT NULL
);

CREATE TABLE "order_products" (
  "id" CHAR(26) PRIMARY KEY,
  "item_group_id" integer NOT NULL,
  "product_id" CHAR(26) NOT NULL,
  "order_id" CHAR(26) NOT NULL
);

CREATE TABLE "customers" (
  "id" CHAR(26) PRIMARY KEY,
  "name" VARCHAR(70) NOT NULL,
  "phone" int8,
  "email" VARCHAR(70),
  "address" TEXT,
  "created_at" timestamp NOT NULL
);

CREATE TABLE "stock"."resource_entries" (
  "id" char(26) PRIMARY KEY,
  "resource_id" char(26),
  "name" varchar(70),
  "brand" varchar(40),
  "product_id" varchar(40),
  "from" varchar(70),
  "cost_per_unit" float,
  "quantity" float,
  "GTIN_code" integer,
  "unit_id" integer,
  "joined_at" timestamp
);

ALTER TABLE "order_products" ADD CONSTRAINT "order_and_order_products_rel" FOREIGN KEY ("order_id") REFERENCES "orders" ("id");

ALTER TABLE "order_products" ADD CONSTRAINT "item_and_order_products_rel" FOREIGN KEY ("product_id") REFERENCES "products" ("id");

ALTER TABLE "orders" ADD CONSTRAINT "orders_and_customer_rel" FOREIGN KEY ("customer_id") REFERENCES "customers" ("id");

ALTER TABLE "orders" ADD CONSTRAINT "orders_and_payment_rel" FOREIGN KEY ("payment_id") REFERENCES "payment" ("id");

ALTER TABLE "payment" ADD CONSTRAINT "payment_and_payment_methods_rel" FOREIGN KEY ("payment_method_id") REFERENCES "payment_methods" ("id");

ALTER TABLE "products" ADD CONSTRAINT "product_categories_rel" FOREIGN KEY ("category_id") REFERENCES "product_categories" ("id");

ALTER TABLE "complement_products" ADD CONSTRAINT "complement_products_complement_rel" FOREIGN KEY ("complement_id") REFERENCES "complements" ("id");

ALTER TABLE "complement_products" ADD CONSTRAINT "products_products_complement_rel" FOREIGN KEY ("product_id") REFERENCES "products" ("id");

ALTER TABLE "products" ADD CONSTRAINT "item_record_status" FOREIGN KEY ("record_status_id") REFERENCES "record_status" ("id");

ALTER TABLE "complements" ADD CONSTRAINT "complement_categories_rel" FOREIGN KEY ("category_id") REFERENCES "complement_categories" ("id");

ALTER TABLE "complement_resource_requirements" ADD CONSTRAINT "complement_resource_requirements_complements_rel" FOREIGN KEY ("complement_id") REFERENCES "complements" ("id");

ALTER TABLE "complement_resource_requirements" ADD CONSTRAINT "complement_resource_requirements_resources_rel" FOREIGN KEY ("resource_id") REFERENCES "resources" ("id");

ALTER TABLE "product_resource_requirements" ADD CONSTRAINT "item_reqs_flavor" FOREIGN KEY ("product_id") REFERENCES "products" ("id");

ALTER TABLE "product_resource_requirements" ADD CONSTRAINT "item_reqs_ingredient" FOREIGN KEY ("resource_id") REFERENCES "resources" ("id");

ALTER TABLE "product_resource_requirements" ADD CONSTRAINT "item_reqs_unit" FOREIGN KEY ("unit_id") REFERENCES "unit_types" ("id");

ALTER TABLE "stock"."resource_entries" ADD CONSTRAINT "resource_entries_resource" FOREIGN KEY ("resource_id") REFERENCES "resources" ("id");

ALTER TABLE "stock"."resource_entries" ADD CONSTRAINT "resource_entries_unit" FOREIGN KEY ("unit_id") REFERENCES "unit_types" ("id");

ALTER TABLE "resources" ADD CONSTRAINT "resources_unit" FOREIGN KEY ("unit_id") REFERENCES "unit_types" ("id");


INSERT INTO users (id, name, email, created_at) VALUES (
	'01JG2MHPB8PA8Y4ZFKA42NBJRF',
	'david de deus mesquita',
	'daviddeusm@live.com',
	'2024-12-26T23:19:26.245Z'
);

INSERT INTO currency_types(id, name, symbol) VALUES 
(1, 'real', 'brl'),
(2, 'dollar', 'us'),
(3, 'euro', 'eur');

INSERT INTO unit_types(id, name, symbol) VALUES 
(1, 'grams', 'g'),
(2, 'kilograms', 'kg');

INSERT INTO record_status (id, "name") VALUES 
(1, 'activated'),
(2, 'desactivated'),
(3, 'paused');

INSERT INTO sizes_coeficient (id, "value",created_at,created_by) VALUES 
(1, 0.5, '2024-12-26T23:19:26.245Z', '01JG2MHPB8PA8Y4ZFKA42NBJRF'),
(2, 0.5, '2024-12-26T23:19:26.245Z', '01JG2MHPB8PA8Y4ZFKA42NBJRF'),
(3, 0.7, '2024-12-26T23:19:26.245Z', '01JG2MHPB8PA8Y4ZFKA42NBJRF'),
(4, 1.0, '2024-12-26T23:19:26.245Z', '01JG2MHPB8PA8Y4ZFKA42NBJRF');


-- Inserindo usuários (Funcionários)
INSERT INTO users (id, name, email, created_at) VALUES
('01H4X1KZZJDRT1VHFAB7V1JQ7T', 'João Pizzaiolo', 'joao@pizzaria.com', '2024-12-20T10:15:00Z'),
('01H4X1KZZJDRT1VHFAB7V1JQ8Z', 'Maria Atendente', 'maria@pizzaria.com', '2024-12-22T14:25:00Z');

-- Inserindo categorias de itens
INSERT INTO product_categories (id, name, products_count, created_at) VALUES
('01H4X1KZZJDRT1VHFAB7V1JQ9Y', 'Pizzas', 3, '2024-12-10T12:00:00Z'),
('01H4X1KZZJDRT1VHFAB7V1JQAZ', 'Bebidas', 2, '2024-12-11T14:00:00Z');


-- Inserindo itens (Pizzas e Bebidas)
INSERT INTO products (id, category_id, name, image_url, description, current_price, record_status_id, sizes, created_at, created_by) VALUES
('01H4X1KZZJDRT1VHFAB7V1JQE4', '01H4X1KZZJDRT1VHFAB7V1JQ9Y', 'Pizza Margherita', 'https://img.com/margherita.jpg', 'Molho de tomate, mussarela, manjericão', 39.90, 1, '{1, 2, 3}', '2024-12-15T12:00:00Z', '01H4X1KZZJDRT1VHFAB7V1JQ7T'),
('01H4X1KZZJDRT1VHFAB7V1JQF5', '01H4X1KZZJDRT1VHFAB7V1JQ9Y', 'Pizza Calabresa', 'https://img.com/calabresa.jpg', 'Molho de tomate, mussarela, calabresa, cebola', 42.90, 1, '{1, 2, 3, 4}', '2024-12-16T15:30:00Z', '01H4X1KZZJDRT1VHFAB7V1JQ7T');

-- Inserindo categorias de complementos (Bordas e Extras)
INSERT INTO complement_categories (id, name) VALUES
('01H4X1KZZJDRT1VHFAB7V1JQG6', 'Bordas Recheadas'),
('01H4X1KZZJDRT1VHFAB7V1JQH7', 'Extras');

-- Inserindo complementos (Bordas e Extras)
INSERT INTO complements (id, category_id, name, image_url, current_price) VALUES
('01H4X1KZZJDRT1VHFAB7V1JQI8', '01H4X1KZZJDRT1VHFAB7V1JQG6', 'Borda de Catupiry', 'https://img.com/borda_catupiry.jpg', 5.00),
('01H4X1KZZJDRT1VHFAB7V1JQJ9', '01H4X1KZZJDRT1VHFAB7V1JQH7', 'Bacon Crocante', 'https://img.com/bacon.jpg', 4.50);


-- Inserindo ingredientes das pizzas
INSERT INTO resources (id, name, quantity, average_cost_per_unit, unit_id, last_entry_at) VALUES
('01H4X1KZZJDRT1VHFAB7V1JQM2', 'Queijo Mussarela', 5000, 30.00, 1, '2024-12-01T08:30:00Z');

-- Inserindo métodos de pagamento
INSERT INTO payment_methods (name, max_installments) VALUES
('Cartão de Crédito', 12);

-- Inserindo pagamentos
INSERT INTO payment (id, payment_method_id, installments_value, installments_count, installment_diff, transaction_id, paid_at) VALUES
('01H4X1KZZJDRT1VHFAB7V1JQO4', 1, 49.90, 2, 0, 'TRANS12345', '2024-12-25T18:30:00Z');

-- Inserindo clientes
INSERT INTO customers (id, name, phone, email, address, created_at) VALUES
('01H4X1KZZJDRT1VHFAB7V1JQP5', 'Carlos Almeida', 11999999999, 'carlos.almeida@email.com', 'Av. das Pizzas, 100', '2024-12-15T09:00:00Z');

-- Inserindo pedidos
INSERT INTO orders (id, customer_id, payment_id, created_at) VALUES
('01H4X1KZZJDRT1VHFAB7V1JQQ6', '01H4X1KZZJDRT1VHFAB7V1JQP5', '01H4X1KZZJDRT1VHFAB7V1JQO4', '2024-12-26T14:00:00Z');

-- Inserindo itens no pedido
INSERT INTO order_products (id, item_group_id, product_id, order_id) VALUES
('01H4X1KZZJDRT1VHFAB7V1JQR7', 1, '01H4X1KZZJDRT1VHFAB7V1JQE4', '01H4X1KZZJDRT1VHFAB7V1JQQ6');
