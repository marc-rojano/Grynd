import jwt from 'jsonwebtoken';

// TODO: middleware que lea el header Authorization, verifique el token JWT
// y guarde el usuario decodificado en req.user antes de llamar a next()
export function requireAuth(req, res, next) {
    // tu lógica aquí
}