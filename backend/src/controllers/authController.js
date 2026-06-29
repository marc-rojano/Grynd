import bcrypt from 'bcryptjs';
import { pool } from '../config/db.js';

// TODO: función register(req, res) -> valida datos, hashea password con bcrypt,
// inserta en la tabla users, devuelve token

// TODO: función login(req, res) -> busca el user por email,
// compara password con bcrypt.compare, devuelve token si es correcto