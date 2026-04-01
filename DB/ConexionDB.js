import mysql from "mysql2/promise";
import config from "./ConfigDB.js";

const pool = mysql.createPool(config.db);

const getConnection = async () => {
  return await pool.getConnection();
};

export { pool, getConnection };


