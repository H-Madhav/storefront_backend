# API Requirements

The company stakeholders want to create an online storefront to showcase their great product ideas. Users need to be able to browse an index of all products, see the specifics of a single product, and add products to an order that they can view in a cart page. You have been tasked with building the API that will support this application, and your coworker is building the frontend.

These are the notes from a meeting with the frontend developer that describe what endpoints the API needs to supply, as well as data shapes the frontend and backend have agreed meet the requirements of the application.

## API Endpoints

#### Products

- Index -- route: `/products` [GET]
- Show -- route:`/products/:id` [GET]
- Create [token required] -- `/products` [POST]

#### Users

- Index [token required] -- route: `/users` [GET]
- Show [token required] -- route: `/users/:id` [GET]
- Create -- route: ` /users` [POST]

#### Orders

- Index -- route: `/orders` [GET]
- Create [token required] -- route: `/orders` [GET]
- Current Order by user (args: user id)[token required] -- route: `/current_order_by_user/:user_id'` [GET]

## Data Shapes

#### DATABASE

- full_stack_dev -- `CREATE DATABASE full_stack_dev;`
- full_stack_test -- `CREATE DATABASE full_stack_test;`

#### Product

- id
- name
- price

  Table: `CREATE TABLE products ( id SERIAL PRIMARY KEY, name VARCHAR(64) NOT NULL, price integer NOT NULL );`

#### User

- id
- firstName
- lastName
- password

Table: `CREATE TABLE users ( id SERIAL PRIMARY KEY, firstname VARCHAR(100), lastname VARCHAR(100), password VARCHAR );`

#### Orders

- id
- quantity of each product in the order
- status of order (active or complete)
- id of each product in the order
- user_id

Table: `CREATE TABLE orders ( id SERIAL PRIMARY KEY, quantity integer, status VARCHAR(15), product_id bigint REFERENCES products(id), user_id bigint REFERENCES users(id) );`
