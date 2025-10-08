const express = require ('express');
const router = express.Router();

const inventarioController = require('../controllers/inventario.controller');

router.post('/registrar-inventario', inventarioController.registrarInventario);
router.get('/obtener-inventarios', inventarioController.obtenerInventarios);
router.get('/obtener-inventario/:id', inventarioController.obtenerInventarioId);
router.put('/actualizar-inventario/:id', inventarioController.actualizarInventario);
router.delete('/eliminar-inventario/:id', inventarioController.eliminarInventario);
router.get('/exportar-inventario', inventarioController.exportarInventario);

module.exports = router;    
