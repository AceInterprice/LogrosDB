import { pool } from "../DB/ConexionDB.js";

export const getAllContent = async (tableName, userId, role) => {
    // Si es ADMIN, no filtramos por user_id, si es USER, sí.
    let query = `SELECT * FROM ${tableName}`;
    let params = [];

    if (role !== 'ADMIN') {
        query += " WHERE user_id = ?";
        params.push(userId);
    }
    
    const [rows] = await pool.query(query, params);
    return rows;
};

export const createContent = async (tableName, data) => {
    const fields = Object.keys(data).join(', ');
    const placeholders = Object.keys(data).map(() => '?').join(', ');
    const values = Object.values(data);

    const [result] = await pool.query(
        `INSERT INTO ${tableName} (${fields}) VALUES (${placeholders})`,
        values
    );
    return { id: result.insertId, ...data };
};

export const updateContent = async (tableName, id, userId, role, data) => {
    const sets = Object.keys(data).map(key => `${key} = ?`).join(', ');
    const values = [...Object.values(data), id];

    let query = `UPDATE ${tableName} SET ${sets} WHERE id = ?`;
    
    // Seguridad: El usuario solo edita lo suyo, el ADMIN edita todo
    if (role !== 'ADMIN') {
        query += " AND user_id = ?";
        values.push(userId);
    }

    const [result] = await pool.query(query, values);
    if (result.affectedRows === 0) throw new Error("No permission or not found");
    return { message: "Updated successfully" };
};

export const deleteContent = async (tableName, id, userId, role) => {
    let query = `DELETE FROM ${tableName} WHERE id = ?`;
    let params = [id];

    if (role !== 'ADMIN') {
        query += " AND user_id = ?";
        params.push(userId);
    }

    const [result] = await pool.query(query, params);
    if (result.affectedRows === 0) throw new Error("No permission or not found");
    return { message: "Deleted successfully" };
};