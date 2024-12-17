import express from "express";
import pool from "./config.js";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json());

const PORT = 5000;

app.get("/", async (req, res) => {
    try {
        const result = await pool.query("SELECT NOW()");
        res.json({
            success: "Connection to database successful",
            data: result.rows[0].data,
        });
    } catch (err) {
        res.status(500).json({
            failure: "Failed to connect to database",
            error: err.message,
        });
    }
});

app.post("/api", async (req, res) => {
    const {
        emp_id,
        emp_name,
        emp_email,
        emp_phone,
        emp_dept,
        emp_doj,
        emp_role,
    } = req.body;

    const checkQuery = `SELECT * FROM employees WHERE emp_id = $1 OR emp_email = $2`;
    const checkValues = [emp_id, emp_email];

    try {
        const checkResult = await pool.query(checkQuery, checkValues);

        if (checkResult.rows.length > 0) {
            res.status(200).json({
                warning: "Employee ID or Email already exists",
            });
            return   
        }
        const query = `INSERT INTO employees (emp_id, emp_name, emp_email, emp_phone, emp_dept, emp_doj, emp_role) 
    VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`;
        const values = [emp_id, emp_name, emp_email, emp_phone, emp_dept, emp_doj, emp_role];

        const result = await pool.query(query, values);

        res.status(201).json({
            success: "Employee added successfully",
            result: result.rows[0],
        });
    } catch (err) {
        res.status(500).json({
            failure: "Failed to add employee",
            error: err.message,
        });
        
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT} :)`);
});
