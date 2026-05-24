import mysql from 'mysql2/promise';

const dbConfig = {
    host: process.env.MYSQL_HOST || 'localhost',
    port: Number(process.env.MYSQL_PORT || 3307),
    user: process.env.MYSQL_USER || 'root',
    password: process.env.MYSQL_PASSWORD || 'Admin@123',
    database: process.env.MYSQL_DATABASE || 'qa_automation',
    connectTimeout: 10000
};

export async function getConnection() {
    return mysql.createConnection(dbConfig);
}

export async function ensureUsersTable() {
    const connection = await getConnection();
    await connection.execute(
        `CREATE TABLE IF NOT EXISTS users (
            id INT AUTO_INCREMENT PRIMARY KEY,
            username VARCHAR(100) NOT NULL,
            password VARCHAR(255) NOT NULL
        )`
    );
    try {
        await connection.execute(`ALTER TABLE users ADD COLUMN email VARCHAR(150) NULL`);
    } catch (error: any) {
        if (!/Duplicate column/.test(error.message)) {
            throw error;
        }
    }
    try {
        await connection.execute(`ALTER TABLE users ADD COLUMN created_at TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP`);
    } catch (error: any) {
        if (!/Duplicate column/.test(error.message)) {
            throw error;
        }
    }
    await connection.end();
}

export async function createUserInDb(user: { username: string; email: string; password: string }) {
    const connection = await getConnection();
    await ensureUsersTable();
    await connection.execute(
        'INSERT INTO users (username, email, password) VALUES (?, ?, ?)',
        [user.username, user.email, user.password]
    );
    await connection.end();
}

export async function getUserByUsername(username: string) {
    const connection = await getConnection();
    const [rows] = await connection.execute('SELECT * FROM users WHERE username = ?', [username]);
    await connection.end();
    return rows;
}

export async function databaseValidation() {
    const connection = await getConnection();
    const [rows] = await connection.execute('SELECT * FROM users');
    console.log(rows);
    await connection.end();
    return rows;
}