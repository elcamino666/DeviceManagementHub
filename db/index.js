import pool from './connection.js'
import sampleData from './rawData.js'

export default class Database {
    static setup = async () => {
        // Create Database if not exists
        const sql = `CREATE DATABASE IF NOT EXISTS ${process.env.MYSQL_DATABASE}`
        await pool.query(sql)

        const sql1 = `USE ${process.env.MYSQL_DATABASE}`
        await pool.query(sql1)

        // Create Table if not exists
        const sql2 = `CREATE TABLE IF NOT EXISTS devices (
            id INT NOT NULL AUTO_INCREMENT,
            name VARCHAR(255) NOT NULL,
            type VARCHAR(255) NOT NULL,
            ownerName VARCHAR(255) NOT NULL,
            batteryStatus INT NOT NULL,
            PRIMARY KEY (id)
        )`
        await pool.query(sql2)

        // Insert some data if table is empty
        const sql3 = `SELECT * FROM devices`
        const [rows] = await pool.query(sql3)
        if (rows.length > 0) return
        const sql4 = `INSERT INTO devices (name, type, ownerName, batteryStatus) VALUES ?`
        await pool.query(sql4, [sampleData])
    }

    static getDevices = async () => {
        const sql = `SELECT * FROM devices`
        const [rows] = await pool.query(sql)
        return rows
    }

    static getDeviceById = async (id) => {
        const sql = `SELECT * FROM devices WHERE id = ?`
        const [rows] = await pool.query(sql, [id])
        return rows[0]
    }

    static removeDeviceById = async (id) => {
        const sql = `DELETE FROM devices WHERE id = ?`
        const [rows] = await pool.query(sql, [id])
        return rows.affectedRows === 1
    }

    static addDevice = async ({ name, type, ownerName, batteryStatus }) => {
        const sql = `INSERT INTO devices (name, type, ownerName, batteryStatus) VALUES (?, ?, ?, ?)`
        const [rows] = await pool.query(sql, [name, type, ownerName, batteryStatus])
        const id = rows.insertId
        return this.getDeviceById(id)
    }

    static updateDeviceById = async ({ id, name, type, ownerName, batteryStatus }) => {
        const sql = `UPDATE devices SET name = ?, type = ?, ownerName = ?, batteryStatus = ? WHERE id = ?`
        await pool.query(sql, [name, type, ownerName, batteryStatus, id])
        return this.getDeviceById(id)
    }
}
