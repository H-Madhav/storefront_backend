# Storefront Backend Project

### install dependencies

This repo contains a basic Node and Express app to get you started in constructing API. To get started, clone this repo and run `npm i` in your terminal at the project root.

### 1. Environment

To ready your environment follow these steps:

1.  Create .env in root of project file with following variables:  
    `POSTGRES_HOST=127.0.0.1 POSTGRES_DB=full_stack_dev POSTGRES_TEST_DB=full_stack_test POSTGRES_USER=postgres POSTGRES_PASSWORD=onemorestep@123 BCRYPT_PASSWORD=onemorestep@123 TOKEN_SECRET=Onemorestep@123 ENV=dev SALT_ROUNDS=10`

2.  Change databse.json in root of project in case of different database config:

### 2. DB Creation

You have to create two database with following names:

1. full_stack_dev -- for dev environment
2. full_stack_test -- for test environment

### 3. Migrations

I have created the migration file with following commands:

1. db-migrate create users-table --sql-file  
   up:  
   CREATE TABLE users (  
   id SERIAL PRIMARY KEY,  
   firstname VARCHAR(100),  
   lastname VARCHAR(100),  
   password VARCHAR  
   );

down: DROP TABLE users

2. db-migrate create products-table --sql-file  
   up:  
   CREATE TABLE products (  
   id SERIAL PRIMARY KEY,  
   name VARCHAR(64) NOT NULL,  
   price integer NOT NULL  
   );

down: DROP TABLE products

3. db-migrate create orders-table --sql-file  
   up:  
   CREATE TABLE orders (  
   id SERIAL PRIMARY KEY,  
   status VARCHAR(15),  
   user_id bigint REFERENCES users(id)  
   );

down: DROP TABLE orders

4. db-migrate create order_products-table --sql-file  
    up:  
   CREATE TABLE order_products (
   id SERIAL PRIMARY KEY,
   quantity integer,
   order_id bigint REFERENCES orders(id),
   product_id bigint REFERENCES products(id)
   );

down: DROP TABLE order_products

### 4. Getting Started

To start the project please start the database

1. run `db-migrate up`
2. run `npm run watch`

### 5. Testing

1. Make sure full_stack_test database do exist.
2. run `npm run test`

### 6. Endpoints

#### Users

- Index [token required] -- `/users`
- Show [token required] -- `/users/:id`
- Create N[token required] --` /users`

#### Products

- Index -- `/products`
- Show -- `/products/:id`
- Create [token required] -- `/products`

#### Orders

- Index -- `/orders`
- Create [token required] -- `/orders`
- Current Order by user (args: user id)[token required] -- `/current_order_by_user/:user_id'`
