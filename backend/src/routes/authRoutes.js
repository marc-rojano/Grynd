import { Router } from 'express';
import { register, login, getProfile } from '../controllers/authController.js';
import { requireAuth } from '../middleware/auth.js';

const router = Router();

router.post('/register', register);
router.post('/login', login);

// Ruta protegida para obtener el perfil del usuario
router.get('/profile', requireAuth, getProfile);

export default router;
