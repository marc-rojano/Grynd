import jwt from 'jsonwebtoken';

// TODO: middleware que lea el header Authorization, verifique el token JWT
// y guarde el usuario decodificado en req.user antes de llamar a next()
export function requireAuth(req, res, next) {
    // Obtener el token del header
    const authHeader = req.header('Authorization');

    // Comprobar si no hay token
    if (!authHeader) {
        return res.status(401).json({ msg: 'No hay token, permiso denegado' });
    }

    // El formato del header es "Bearer <token>"
    const token = authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({ msg: 'Formato de token inválido, permiso denegado' });
    }

    try {
        // Verificar el token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        // Agregar el usuario del payload a la request
        req.user = decoded;
        next();
    } catch (e) {
        res.status(401).json({ msg: 'El token no es válido' });
    }
}