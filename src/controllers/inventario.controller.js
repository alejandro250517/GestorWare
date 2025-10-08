const Inventario = require('../models/Inventario');
const ExcelJS = require('exceljs');
const registrarInventario = async (req, res) => {
    try {
        const {
            regional,
            oficina,
            selector,
            encuestador,
            pantalla,
            player,
            parlante,
            amplificador
        } = req.body;

        const nuevoInventario = new Inventario({
            regional,
            oficina,
            selector,
            encuestador,
            pantalla,
            player,
            parlante,
            amplificador
        });

        await nuevoInventario.save();
        res.json({ message: 'Inventario registrado correctamente' });
    } catch (error) {
        console.error('Error al registrar el inventario:', error);
        res.status(500).json({ message: 'Error al registrar el inventario' });
    }
};

const obtenerInventarios = async (req, res) => {
    try {
        const inventarios = await Inventario.find();
        res.json(inventarios);
    } catch (error) {
        console.error('Error al obtener los inventarios:', error);
        res.status(500).json({ message: 'Error al obtener los inventarios' });
    }
};

const obtenerInventarioId = async (req, res) => {
    try {
        const { id } = req.params;
        const inventario = await Inventario.findById(id);
        if (!inventario) {
            return res.status(404).json({ message: 'Inventario no encontrado' });
        }
        res.json(inventario);
    } catch (error) {
        console.error('Error al obtener el inventario:', error);
        res.status(500).json({ message: 'Error al obtener el inventario' });
    }
};


const actualizarInventario = async (req, res) => {
    try {
        const { id } = req.params;
        const { regional, oficina, selector, encuestador, pantalla, player, parlante, amplificador } = req.body;
        const inventario = await Inventario.findById(id);
        if(!inventario){
            return res.status(404).json({ message: 'Inventario no encontrado' });
        }
        inventario.regional = regional;
        inventario.oficina = oficina;
        inventario.selector = selector;
        inventario.encuestador = encuestador;
        inventario.pantalla = pantalla;
        inventario.player = player;
        inventario.parlante = parlante;
        inventario.amplificador = amplificador;
        await inventario.save();
        console.log('Informacion', inventario);
        res.json({ message: 'Inventario actualizado correctamente' });

    } catch (error) {
        console.error('Error:', error.message);
        res.status(500).json({ message: 'Error al actualizar el inventario' });
    }
};


const eliminarInventario = async (req, res) => {
    try {
        const { id } = req.params;
        const inventario = await Inventario.findByIdAndDelete(id);
        if (!inventario) {
            return res.status(404).json({ message: 'Inventario no encontrado' });
        }
        res.json({ message: 'Inventario eliminado correctamente' });
    } catch (error) {
        console.error('Error al eliminar el inventario:', error);
        res.status(500).json({ message: 'Error al eliminar el inventario' });
    }
};

const exportarInventario = async(req, res ) =>{
    try {
        const inventarios = await Inventario.find();

        const workbook = new ExcelJS.Workbook();
        const worksheet = workbook.addWorksheet('Inventarios');

        // Encabezados de columna
        worksheet.columns = [
        { header: 'Regional', key: 'regional', width: 20 },
        { header: 'Oficina', key: 'oficina', width: 20 },
        { header: 'Selector', key: 'selector', width: 20 },
        { header: 'Encuestador', key: 'encuestador', width: 20 },
        { header: 'Pantalla', key: 'pantalla', width: 20 },
        { header: 'Player', key: 'player', width: 20 },
        { header: 'Parlante', key: 'parlante', width: 20 },
        { header: 'Amplificador', key: 'amplificador', width: 20 },

        ];
        // Aplicar estilo a los encabezados
        worksheet.getRow(1).eachCell((cell) => {
        cell.font = { bold: true, color: { argb: 'FFFFFFFF' } }; // Texto blanco
        cell.fill = {
            type: 'pattern',
            pattern: 'solid',
            fgColor: { argb: '4472C4' }, // Azul (puedes cambiar el color)
        };
        cell.alignment = { vertical: 'middle', horizontal: 'center' };
        cell.border = {
            top: { style: 'thin' },
            left: { style: 'thin' },
            bottom: { style: 'thin' },
            right: { style: 'thin' }
        };
        });
        // Agregar los datos
        inventarios.forEach(inventario => {
        worksheet.addRow({
        regional: inventario.regional,
        oficina: inventario.oficina,
        selector: inventario.selector.map(s => `Serial: ${s.serial}, MAC: ${s.mac}, IP: ${s.ip}`).join(' | '),
        encuestador: inventario.encuestador.map(e => `Serial: ${e.serial}, MAC: ${e.mac}, IP: ${e.ip}`).join(' | '),
        pantalla: inventario.pantalla.map(p => `Marca: ${p.marca}, Serial: ${p.serial}, Tamaño: ${p.tamano}`).join(' | '),
        player: inventario.player.map(p => `Serial: ${p.serial}, MAC: ${p.mac}, IP: ${p.ip}, Marca: ${p.marca}, Modelo: ${p.modelo}, SO: ${p.sistemaOperativo}`).join(' | '),
        parlante: inventario.parlante.map(p => `Serial: ${p.serial}`).join(' | '),
        amplificador: inventario.amplificador.map(a => `Serial: ${a.serial}`).join(' | '),
        });
        });
            // Establecer cabeceras de respuesta para descarga
            res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
            res.setHeader('Content-Disposition', 'attachment; filename=inventario.xlsx');

            // Enviar archivo como stream
            await workbook.xlsx.write(res);
            res.end();

    } catch (error) {
            console.error('Error al exportar el inventario:', error);
            res.status(500).json({ message: 'Error al exportar el inventario' });
    }
};

module.exports = { registrarInventario, obtenerInventarios, obtenerInventarioId, actualizarInventario, eliminarInventario, exportarInventario };
