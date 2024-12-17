import dotenv from "dotenv"
import pkg from 'pg';
const { Pool } = pkg;


dotenv.config();

const pool = new Pool({
    host :"localhost",
    user : "postgres",
    port : 5432,
    password : "joans88joejon",
    database : "test"
})
export default pool ;