/* Replace with your SQL commands */
CREATE TABLE orders ( 
    id SERIAL PRIMARY KEY, 
    quantity integer, 
    status VARCHAR(15), 
    product_id bigint REFERENCES products(id),
    user_id bigint REFERENCES users(id) 
);