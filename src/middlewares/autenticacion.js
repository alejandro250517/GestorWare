const jwt = require('jsonwebtoken');
const Usuario = require('../models/Usuario');

const authAdmin = async (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'Token no proporcionado' });

  try {
    const decoded = jwt.verify(token, process.env.JWT);
    const usuario = await Usuario.findById(decoded.userId);

    if (!usuario) return res.status(404).json({ message: 'Usuario no encontrado' });

    if (usuario.perfil !== 'Administrador') {
      return res.status(403).json({ message: 'Acceso denegado. No es administrador.' });
    }

    req.usuario = usuario;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Token inválido o expirado' });
  }
};

module.exports = authAdmin;
