require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const Usuario = require('../src/models/Usuario');
// Conexión a MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('Conectado a la base de datos');
    usuarioFijo(); // Ejecutar al conectar
  })
  .catch((err) => {
    console.log(err);
  });

  //Creacion de usuario por defecto 
  async function usuarioFijo() {
  const usuarioExistente = await Usuario.findOne({ correo: 'analista@colpensiones.gov.co' });

  if (!usuarioExistente) {
    const nuevoUsuario = new Usuario({
      nombre: 'Analista',
      correo: 'analista@colpensiones.gov.co', //Correo fijo 
      contrasena: 'Analista123..',            //Contraseña fija
      perfil: 'Analista'
    });

    // Encriptar contraseña
    const salt = await bcrypt.genSalt(10);
    nuevoUsuario.contrasena = await bcrypt.hash(nuevoUsuario.contrasena, salt);

    await nuevoUsuario.save();
    console.log('Usuario fijo creado');
  } else {
    console.log('El usuario fijo ya existe');
  }
}
