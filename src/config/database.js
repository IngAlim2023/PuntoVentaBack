import  mysql  from "mysql2/promise";
import dotenv from 'dotenv';

dotenv.config();

export const pool = mysql.createPool({
    host: 'localhost',
    user: process.env.USER_MYSQL,
    password: process.env.PASSWORD_MYSQL,
    database: 'gestion_tienda',
    waitForConnections: true,
    connectionLimit: 10,
});

async function testConnection() {
    try{
        const [rows] = await pool.execute("SELECT 1 + 1 AS solution");
        console.log(`Conexión existosa a MySQL, ${rows[0].solution}`);
        console.log(
            process.env.PASSWORD_MYSQL,
            process.env.USER_MYSQL
        )
    } catch (e){
        console.log(`Error de conexión a MySQL: ${e}`);
        console.log(
            process.env.PASSWORD_MYSQL,
            process.env.USER_MYSQL
        )
    }
}

testConnection();