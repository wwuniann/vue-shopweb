const express = require('express');
const mysql = require('mysql2/promise');
const cors = require('cors');

const app = express();
const port = 3000;

// 配置 CORS
app.use(cors());
app.use(express.json());

// 数据库连接配置
const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'mysql',
    database: 'jinxi'
});

// 数据库连接测试函数
const testDatabaseConnection = async () => {
    try {
        const connection = await pool.getConnection();
        console.log('数据库连接成功');
        connection.release();
    } catch (error) {
        console.error('数据库连接失败:', error);
    }
};

// 调用数据库连接测试函数
testDatabaseConnection();

// 处理留言提交
app.post('/messages', async (req, res) => {
    const { name, message } = req.body;

    try {
        const [result] = await pool.execute(
            'INSERT INTO messages (name, message) VALUES (?, ?)',
            [name, message]
        );
        res.status(201).json({ id: result.insertId, name, message });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to save message' });
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});