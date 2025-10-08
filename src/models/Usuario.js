const mongoose = require('mongoose');

const UsuarioSchema = new mongoose.Schema({
  correo: { type: String, required: true, unique: true },
  contrasena: { type: String, required: false },
  nombre: { type: String, required: true }
},{
  timestamps: true
}
);
module.exports = mongoose.model('Usuario', UsuarioSchema);
