import dotenv from "dotenv"
import pkg from 'pg';
const { Pool } = pkg;


dotenv.config();

const pool = new Pool({
    host :"aws-0-ap-southeast-1.pooler.supabase.com",
    user : "postgres.fechvafnbuiaulcnrwrs",
    port : 5432,
    password : "joans88joejon",
    database : "postgres"
})
export default pool ;