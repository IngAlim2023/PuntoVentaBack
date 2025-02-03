import  mysql  from "mysql2/promise";

export const pool = mysql.createPool({
    host: 'localhost',
    user: process.env.USER_MYSQL,
    password: process.env.PASSWORD_MYSQL,
    database: 'gestion_tienda',
    waitForConnections: true,
    connectionLimit: 0,
});

async function testConnection() {
    try{
        const [rows] = await pool.execute("SELECT 1 + 1 AS solution");
        console.log(`Conexión existosa a MySQL, ${rows[0].solution}`);
    } catch (e){
        console.log(`Error de conexión a MySQL: ${e}`);
    }
}

testConnection();