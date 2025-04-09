

import mysql from "mysql2/promise.js";

export default async function conectar() {
    if (global.poolConexoes) {
        return await global.poolConexoes.getConnection();
    } else {
        global.poolConexoes = mysql.createPool({
            host: 'localhost',
            user: 'root',
            database: 'eleicoes2026',
            port: 3306,
            waitForConnections: true,
            connectionLimit: 20,
            maxIdle: 10, // max idle connections
            idleTimeout: 60000, // idle connections timeout in milliseconds
            queueLimit: 0,
            enableKeepAlive: true,
            keepAliveInitialDelay: 0,
        });
        return await global.poolConexoes.getConnection();
    }
}
