import client from '../database';
import bcrypt from 'bcrypt';

export type User = {
    id?: number,
    firstname: string,
    lastname: string,
    password: string
}
const {
    BCRYPT_PASSWORD: pepper,
    SALT_ROUNDS: saltRounds
} = process.env 


export class UserStore {
    async index(): Promise<User[]> {
        try {
            const conn = await client.connect()
            const sql = 'SELECT * FROM users'
            const result = await conn.query(sql)
            conn.release()
            return result.rows 
        } catch (err) {
            throw new Error(`Could not get users. Error: ${err}`)
        }
      }
    
      async show(id: string): Promise<User> {
        try {
            const sql = 'SELECT * FROM users WHERE id=($1)'
            const conn = await client.connect()
            const result = await conn.query(sql, [id])
            conn.release()
            return result.rows[0]
        } catch (err) {
            throw new Error(`Could not find user ${id}. Error: ${err}`)
        }
      }

      async create(u: User): Promise<User> {
        try {
            const conn = await client.connect()
            const sql = 'INSERT INTO users (firstname, lastname, password) VALUES($1, $2, $3) RETURNING *'
            const hash = bcrypt.hashSync(
                u.password + pepper, 
                parseInt(saltRounds as string)
            );
    
            const result = await conn.query(sql, [u.firstname, u.lastname, hash])
            const user = result.rows[0]
            conn.release()
            return user
        } catch(err) {
            throw new Error(`unable to create user (${u.firstname}): ${err}`)
        } 
    }
}