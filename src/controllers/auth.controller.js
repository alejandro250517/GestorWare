const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Usuario = require('../models/Usuario');
// Controlador para iniciar sesión
const login = async (req, res) => {
  const { correo, contrasena } = req.body;

  const usuario = await Usuario.findOne({ correo });
  if (!usuario) return res.status(400).json({ message: 'Usuario no encontrado' });

  const isMatch = await bcrypt.compare(contrasena, usuario.contrasena);
  if (!isMatch) return res.status(400).json({ message: 'Contraseña incorrecta' });

  const token = jwt.sign({ userId: usuario._id }, process.env.JWT, { expiresIn: '1h' });

  res.json({ token });
};

module.exports = { login};
