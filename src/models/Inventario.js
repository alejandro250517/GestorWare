    const mongoose = require('mongoose');

    const SelectorSchema = new mongoose.Schema({ 
      serial: String,
      mac: String,
      ip: String
    })

    const EncuestadorSchema = new mongoose.Schema({
      serial: String,
      mac: String,
      ip: String
    });

    const PlayerSchema = new mongoose.Schema({
      serial: String,
      mac: String,
      ip: String,
      marca: String,
      modelo: String,
      sistemaOperativo: String
    });

    const PantallaSchema = new mongoose.Schema({
      marca: String,
      serial: String,
      tamano: String
    });

    const AmplificadorSchema = new mongoose.Schema({
      serial: String
    });

    const ParlanteSchema = new mongoose.Schema({
      serial: String
    });

    const InventarioSchema = new mongoose.Schema({
      regional: { type: String },
      oficina: { type: String },
      selector:  SelectorSchema,       
      encuestador: EncuestadorSchema,
      pantalla: PantallaSchema,       
      player: PlayerSchema,
      amplificador: AmplificadorSchema,
      parlantes: ParlanteSchema,
      
      // Arrays de objetos
      selector: [SelectorSchema],
      encuestador: [EncuestadorSchema],
      player: [PlayerSchema],
      pantalla: [PantallaSchema],
      amplificador: [AmplificadorSchema],
      parlante: [ParlanteSchema]
    }, {
      timestamps: true
    });

    module.exports = mongoose.model('Inventario', InventarioSchema);



    

