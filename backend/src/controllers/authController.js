import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import pool from '../config/db.js';

export const register = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = await pool.query(
      'INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING *',
      [username, email, hashedPassword]
    );

    const token = jwt.sign({ id: newUser.rows[0].id }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });

    res.status(201).json({ token });
  } catch (error) {
    console.error(error.message);
    // Error code '23505' is for unique violation in PostgreSQL
    if (error.code === '23505') {
      return res.status(400).json({ msg: 'El nombre de usuario o email ya existe.' });
    }
    res.status(500).send('Server error');
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await pool.query('SELECT * FROM users WHERE email = $1', [email]);

    if (user.rows.length === 0) {
      return res.status(400).json({ msg: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.rows[0].password);

    if (!isMatch) {
      return res.status(400).json({ msg: 'Invalid credentials' });
    }

    const token = jwt.sign({ id: user.rows[0].id }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });

    res.json({ token });
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
};

export const getProfile = async (req, res) => {
  try {
    // req.user es establecido por el middleware de autenticación y contiene el id del usuario
    const user = await pool.query('SELECT id, username, email FROM users WHERE id = $1', [req.user.id]);

    if (user.rows.length === 0) {
      return res.status(404).json({ msg: 'Usuario no encontrado' });
    }

    res.json(user.rows[0]);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
};
