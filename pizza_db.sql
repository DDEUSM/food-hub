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

CREATE TABLE "pizzas" (
  "id" CHAR(26) PRIMARY KEY,
  "flavor" VARCHAR(70) UNIQUE,
  "current_price" decimal(10, 2),
  "currency_id" integer,
  "record_status_id" integer,
  "sizes" integer[],
  "created_at" timestamp,
  "created_by" CHAR(26),
  "edited_at" timestamp,
  "edited_by" char(26)
);

CREATE TABLE "sizes_coeficient" (
  "id" integer PRIMARY KEY,
  "value" decimal(10, 2),
  "edtied_at" timestamp,
  "edited_by" CHAR(26),
  "created_at" timestamp,
  "created_by" CHAR(26)
);

CREATE TABLE "pizza_requirements" (
  "id" CHAR(26) PRIMARY KEY,
  "pizza_id" char(26),
  "resource_id" char(26),
  "quantity_required" decimal(10, 2),
  "unit_id" integer,
  "edited_at" timestamp,
  "edited_by" char(26),
  "created_at" timestamp,
  "created_by" char(26)
);

CREATE TABLE "resources" (
  "id" char(26) PRIMARY KEY,
  "name" varchar(70) UNIQUE,
  "quantity" decimal(10, 2),
  "average_cost_per_unit" decimal(10, 2),
  "currency_id" integer,
  "unit_id" integer,
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

CREATE TABLE "stock"."resource_entries" (
  "id" char(26) PRIMARY KEY,
  "resource_id" char(26),
  "name" varchar(70),
  "brand" varchar(40),
  "product_id" varchar(40),
  "from" varchar(70),
  "cost_per_unit" decimal(10, 2),
  "quantity" decimal(10, 2),
  "unit_id" integer,
  "currency_id" integer,
  "joined_at" timestamp
);

ALTER TABLE "pizzas" ADD CONSTRAINT "pizza_record_status" FOREIGN KEY ("record_status_id") REFERENCES "record_status" ("id");

ALTER TABLE "pizzas" ADD CONSTRAINT "pizza_currency" FOREIGN KEY ("currency_id") REFERENCES "currency_types" ("id");

ALTER TABLE "pizza_requirements" ADD CONSTRAINT "pizza_reqs_flavor" FOREIGN KEY ("pizza_id") REFERENCES "pizzas" ("id");

ALTER TABLE "pizza_requirements" ADD CONSTRAINT "pizza_reqs_ingredient" FOREIGN KEY ("resource_id") REFERENCES "resources" ("id");

ALTER TABLE "pizza_requirements" ADD CONSTRAINT "pizza_reqs_unit" FOREIGN KEY ("unit_id") REFERENCES "unit_types" ("id");

ALTER TABLE "stock"."resource_entries" ADD CONSTRAINT "resource_entries_resource" FOREIGN KEY ("resource_id") REFERENCES "resources" ("id");

ALTER TABLE "stock"."resource_entries" ADD CONSTRAINT "resource_entries_currency" FOREIGN KEY ("currency_id") REFERENCES "currency_types" ("id");

ALTER TABLE "stock"."resource_entries" ADD CONSTRAINT "resource_entries_unit" FOREIGN KEY ("unit_id") REFERENCES "unit_types" ("id");

ALTER TABLE "resources" ADD CONSTRAINT "resources_currency" FOREIGN KEY ("currency_id") REFERENCES "currency_types" ("id");

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


INSERT INTO pizzas (id, flavor, current_price, record_status_id, sizes, created_at, created_by) VALUES (
	'01JG2M02DMMH2KYXAJQNZQAH9N',
	'Mussarela',
  40.0,
	1,
	'{1,2,3,4}',
  '2024-12-26T23:19:26.245Z', 
  '01JG2MHPB8PA8Y4ZFKA42NBJRF'
);

INSERT INTO pizzas (id, flavor, current_price, record_status_id, sizes, created_at, created_by) VALUES (
	'01JG2X920N1FPJZX04WKVAFV7Q',
	'Portuguesa',
  42.0,
	1,
	'{1,2,3,4}',
  '2024-12-26T23:19:26.245Z', 
  '01JG2MHPB8PA8Y4ZFKA42NBJRF'
);

INSERT INTO resources (id, name, quantity, average_cost_per_unit, currency_id, unit_id, last_entry_at) VALUES 
('01JG2N4AYFHGG42P36PSC9EVGS', 'queijo mussarela', 2.0, 50.0, 1, 2, '2024-12-26T23:19:26.245Z'),
('01JG2N4C2DZQY6RTQD8CK6NHHP', 'orégano', 1.5, 20.5, 1, 2, '2024-12-26T23:19:26.245Z'),
('01JG2N51HBF2318Y7QMS9AHQAW', 'molho de tomate', 2.5, 34.0, 1, 2, '2024-12-26T23:19:26.245Z'),
('01JG2N57MBNY1HQJM23KGJ81JV', 'farinha de trigo', 3.2, 35.22, 1, 2, '2024-12-26T23:19:26.245Z'),
('01JG2X36W3GM6N0FS6WC1AMY9W', 'presunto suíno', 4.0, 23, 1, 2, '2024-12-26T23:19:26.245Z');

INSERT INTO pizza_requirements (id, pizza_id, resource_id, quantity_required, unit_id, created_at, created_by) VALUES 
('01JG2NV2TE6K8HMXGBBVBJ6SAK', '01JG2M02DMMH2KYXAJQNZQAH9N', '01JG2N4AYFHGG42P36PSC9EVGS', 0.2, 2, '2024-12-26T23:19:26.245Z', '01JG2MHPB8PA8Y4ZFKA42NBJRF'),
('01JG2NVB3K4HPSCQWESFWCA4WK', '01JG2M02DMMH2KYXAJQNZQAH9N', '01JG2N4C2DZQY6RTQD8CK6NHHP', 0.1, 2, '2024-12-26T23:19:26.245Z', '01JG2MHPB8PA8Y4ZFKA42NBJRF'),
('01JG2NVGAQCK258R7HAN73DZ8K', '01JG2M02DMMH2KYXAJQNZQAH9N', '01JG2N51HBF2318Y7QMS9AHQAW', 0.13, 2,
'2024-12-26T23:19:26.245Z', '01JG2MHPB8PA8Y4ZFKA42NBJRF'),
('01JG2NVPP3XCCNANCRSN59T6EQ', '01JG2M02DMMH2KYXAJQNZQAH9N', '01JG2N57MBNY1HQJM23KGJ81JV', 0.25, 2, '2024-12-26T23:19:26.245Z', '01JG2MHPB8PA8Y4ZFKA42NBJRF');

INSERT INTO pizza_requirements (id, pizza_id, resource_id, quantity_required, unit_id, created_at, created_by) VALUES 
('01JG2XDEZQYQZQ17AXPSZ6GRGA', '01JG2X920N1FPJZX04WKVAFV7Q', '01JG2N4AYFHGG42P36PSC9EVGS', 0.2, 2, '2024-12-26T23:19:26.245Z', '01JG2MHPB8PA8Y4ZFKA42NBJRF'),
('01JG2XDSXZ9ZPSK5GD6QPWJA8Y', '01JG2X920N1FPJZX04WKVAFV7Q', '01JG2N4C2DZQY6RTQD8CK6NHHP', 0.1, 2, '2024-12-26T23:19:26.245Z', '01JG2MHPB8PA8Y4ZFKA42NBJRF'),
('01JG2XE1HT2MMYKKYNSDJ9XKEQ', '01JG2X920N1FPJZX04WKVAFV7Q', '01JG2N51HBF2318Y7QMS9AHQAW', 0.13, 2,
'2024-12-26T23:19:26.245Z', '01JG2MHPB8PA8Y4ZFKA42NBJRF'),
('01JG2XEAFNEC3Z8X17BRRV9653', '01JG2X920N1FPJZX04WKVAFV7Q', '01JG2N57MBNY1HQJM23KGJ81JV', 0.25, 2, '2024-12-26T23:19:26.245Z', '01JG2MHPB8PA8Y4ZFKA42NBJRF'),
('01JG2XEMK8HR82RJ7CJE78BKVJ', '01JG2X920N1FPJZX04WKVAFV7Q', '01JG2X36W3GM6N0FS6WC1AMY9W', 0.2, 2, '2024-12-26T23:19:26.245Z', '01JG2MHPB8PA8Y4ZFKA42NBJRF');
