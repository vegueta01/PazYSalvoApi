var express = require('express');
var router = express.Router();

// router.get('/', function(req, res) {
//   res.setHeader('Access-Control-Allow-Origin', '*');
//   res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE'); // If needed
//   res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type'); // If needed
//   res.setHeader('Access-Control-Allow-Credentials', true); // If needed

//   res.send('cors problem fixed:)');
// });

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('reporte1', { title: 'Felipe' });
});




//  function(req, res, next) {
//   res.render('allocationReport', 
//   {
//     // title: 'Asignación de equipos',
//     tableTitle:'Equipos entregados',
//     city:'Bogotá',
//     date: new Date().toLocaleString(),
//     employeeName:'Manuel Felipe',
//     employeeCharge:'Ing. Soporte',
//     array:[{nombre:'nombre1',apellido:'apellido1'},{nombre:'mijter',apellido:'apellido2'}],
//     observation:'Mis observaciones',
//     delivery:'Camilo santamría',
//     deliveryCharge:'Ing. Soporte',
    
//   }); 
// });

router.get('/reporte1Pdf', function(req, res, next) {
  res.render('reporte1', { title: 'Felipe' });
});
const users = require('../controllers/users');
const equipo = require('../controllers/equipo');
const ingresoAManteminiento = require('../controllers/ingresoAManteminiento');
const usuarios = require('../controllers/usuarios');

const manManten = require('../controllers/manManten');
const manMantenDetalle = require('../controllers/manMantenDetalle');
const genEstado = require('../controllers/genEstado');
const genUsuarios = require('../controllers/genUsuarios');
const genCasa = require('../controllers/genCasa');
const genTablas = require('../controllers/genTablas');
const companiaSedeArea = require('../controllers/companiaSedeArea');
const manTipoEquipo = require('../controllers/manTipoEquipo');
const genMarca = require('../controllers/genMarca');
const genMarcaLinea = require('../controllers/genMarcaLinea');
const getTipoCombustible = require('../controllers/getTipoCombustible');
const genUnidadMedida = require('../controllers/genUnidadMedida');
const manTarea = require('../controllers/manTarea');
const genUnidad = require('../controllers/genUnidad');
const genPerfil = require('../controllers/genPerfil');
const testPdf = require('../controllers/testPdf');

const genCompania = require('../controllers/genCompania');
const genCompaniaSede = require('../controllers/genCompaniaSede');

const pstTipoElemento = require('../controllers/pstTipoElemento');

router.get('/pstTipoElemento',pstTipoElemento.get);
router.get('/pstTipoElemento/:id',pstTipoElemento.getById);
router.post('/pstTipoElemento',pstTipoElemento.add);
router.put('/pstTipoElemento',pstTipoElemento.update);
router.delete('/pstTipoElemento/:id',pstTipoElemento.delete);
router.get('/pstTipoElemento/consult/estadoActivo',pstTipoElemento.getByActive);

const pstMarcaElemento = require('../controllers/pstMarcaElemento');

router.get('/pstMarcaElemento',pstMarcaElemento.get);
router.get('/pstMarcaElemento/:id',pstMarcaElemento.getById);
router.post('/pstMarcaElemento',pstMarcaElemento.add);
router.put('/pstMarcaElemento',pstMarcaElemento.update);
router.delete('/pstMarcaElemento/:id',pstMarcaElemento.delete);
router.get('/pstMarcaElemento/consult/estadoActivo',pstMarcaElemento.getByActive);

const pstElemento = require('../controllers/pstElemento');

router.get('/pstElemento',pstElemento.get);
router.get('/pstElemento/:id',pstElemento.getById);
router.post('/pstElemento',pstElemento.add);
router.put('/pstElemento',pstElemento.update);
router.delete('/pstElemento/:id',pstElemento.delete);
router.get('/pstElemento/consult/estadoActivo',pstElemento.getByActive);
router.get('/pstElemento/consult/getAssignedElements',pstElemento.getAssignedElementsByEmployeeId);
router.get('/pstElemento/consult/getInventoryToals',pstElemento.getInventoryToals);


const pstTransaccion = require('../controllers/pstTransaccion');

router.get('/pstTransaccion',pstTransaccion.get);
router.get('/pstTransaccion/:id',pstTransaccion.getById);
router.post('/pstTransaccion',pstTransaccion.add);
router.put('/pstTransaccion',pstTransaccion.update);
router.delete('/pstTransaccion/:id',pstTransaccion.delete);
router.get('/pstTransaccion/consult/estadoActivo',pstTransaccion.getByActive);

const pstTransaccionDetalle = require('../controllers/pstTransaccionDetalle');

router.get('/pstTransaccionDetalle',pstTransaccionDetalle.get);
router.get('/pstTransaccionDetalle/:id',pstTransaccionDetalle.getById);
router.post('/pstTransaccionDetalle',pstTransaccionDetalle.add);
router.put('/pstTransaccionDetalle',pstTransaccionDetalle.update);
router.delete('/pstTransaccionDetalle/:id',pstTransaccionDetalle.delete);
router.get('/pstTransaccionDetalle/consult/withAssignmentEmployee',pstTransaccionDetalle.getDetalleAssignmentWithEmployee);
router.get('/pstTransaccionDetalle/consult/estadoActivo',pstTransaccionDetalle.getByActive);

const pstInventario = require('../controllers/pstInventario');

router.get('/pstInventario',pstInventario.get);
router.get('/pstInventario/:id',pstInventario.getById);
router.post('/pstInventario',pstInventario.add);
router.put('/pstInventario',pstInventario.update);
router.delete('/pstInventario/:id',pstInventario.delete);
router.get('/pstInventario/consult/estadoActivo',pstInventario.getByActive);

const genEmpleado = require('../controllers/genEmpleado');

router.get('/genEmpleado',genEmpleado.get);
router.get('/genEmpleado/:id',genEmpleado.getById);
router.post('/genEmpleado',genEmpleado.add);
router.put('/genEmpleado',genEmpleado.update);
router.delete('/genEmpleado/:id',genEmpleado.delete);
router.get('/genEmpleado/consult/estadoActivo',genEmpleado.getByActive);

const pstTipoTransaccion = require('../controllers/pstTipoTransaccion');

router.get('/pstTipoTransaccion',pstTipoTransaccion.get);
router.get('/pstTipoTransaccion/:id',pstTipoTransaccion.getById);
router.post('/pstTipoTransaccion',pstTipoTransaccion.add);
router.put('/pstTipoTransaccion',pstTipoTransaccion.update);
router.delete('/pstTipoTransaccion/:id',pstTipoTransaccion.delete);
router.get('/pstTipoTransaccion/consult/estadoActivo',pstTipoTransaccion.getByActive);

const pstDetallesEquipo = require('../controllers/pstDetallesEquipo');

router.get('/pstDetallesEquipo',pstDetallesEquipo.get);
router.get('/pstDetallesEquipo/:id',pstDetallesEquipo.getById);
router.post('/pstDetallesEquipo',pstDetallesEquipo.add);
router.put('/pstDetallesEquipo',pstDetallesEquipo.update);
router.delete('/pstDetallesEquipo/:id',pstDetallesEquipo.delete);
router.get('/pstDetallesEquipo/consult/estadoActivo',pstDetallesEquipo.getByActive);

const reports = require('../controllers/reportsPDF');

router.get('/reportsHardwareAllocation',reports.hardwareAllocation);
router.get('/reportsHardwareReturn',reports.hardwareReturn);

const reportsHTML = require('../controllers/reportsHTML');

router.get('/allocationReport',reportsHTML.hardwareAllocation)
router.get('/returnReport',reportsHTML.hardwareReturn)

const saveFiles = require('../controllers/saveFiles');
router.post('/fileAllocation',saveFiles.saveFileAllocation);
router.post('/fileAllocation/:id',saveFiles.saveFileAllocation);
router.delete('/fileAllocation',saveFiles.deleteFileAllocation);
router.post('/saveFileReturn',saveFiles.saveFileReturn);

const genArchivos = require('../controllers/genArchivos');

router.get('/genArchivos',genArchivos.get);
router.get('/genArchivos/:id',genArchivos.getById);
router.post('/genArchivos',genArchivos.add);
router.put('/genArchivos',genArchivos.update);
router.delete('/genArchivos/:id',genArchivos.remove);
router.get('/genArchivos/consult/estadoActivo',genArchivos.getByActive);
router.post('/genArchivos/saveFile/:idReferenceTable/:idReference',genArchivos.saveFile);
router.delete('/genArchivos/deleteFile/:id',genArchivos.deleteFile);

router.get('/genArchivos/getFile/:idReferenceTable/:idReference',genArchivos.getFile);
router.get('/download/:fileId',genArchivos.downloadFile);

const filesBase64  = require('../controllers/filesBase64');
router.get('/filesBase64/:fileId',filesBase64.getFile);

router.get('/users',users.get);
router.get('/users/:id',users.getById);
router.post('/users',users.add);
router.put('/users',users.update);
router.delete('/users/:id',users.delete);
router.get('/prueba',users.prueba);
// router.get('/prueba2',users.prueba2);

router.get('/equipo',equipo.get);
router.get('/equipo/:id',equipo.getById);
router.post('/equipo',equipo.add);
router.put('/equipo',equipo.update);
router.delete('/equipo/:id',equipo.delete);
router.get('/equipo/consult/estadoActivo',equipo.getByActive);

router.get('/ingresoAManteminiento',ingresoAManteminiento.get);
router.get('/ingresoAManteminiento/:id',ingresoAManteminiento.getById);
router.post('/ingresoAManteminiento',ingresoAManteminiento.add);
router.put('/ingresoAManteminiento',ingresoAManteminiento.update);
router.delete('/ingresoAManteminiento/:id',ingresoAManteminiento.delete);

router.get('/usuarios',usuarios.get);
router.get('/usuarios/:id',usuarios.getById);
router.post('/usuarios',usuarios.add);
router.put('/usuarios',usuarios.update);

router.get('/manManten',manManten.get);
router.get('/manManten/:id',manManten.getById);
router.post('/manManten',manManten.add);
router.put('/manManten',manManten.update);
router.delete('/manManten/:id',manManten.delete);
router.get('/manManten/consult/estadoActivo',manManten.getByActive);

router.get('/manMantenDetalle',manMantenDetalle.get);
router.get('/manMantenDetalle/:id',manMantenDetalle.getById);
router.post('/manMantenDetalle',manMantenDetalle.add);
router.put('/manMantenDetalle',manMantenDetalle.update);
router.delete('/manMantenDetalle/:id',manMantenDetalle.delete);
router.get('/manMantenDetalle/consult/estadoActivo',manMantenDetalle.getByActive);

router.get('/genEstado',genEstado.get);// llama todos los campos de la tabla estado
router.get('/genEstado/:id',genEstado.getById);// consulta el campo ID  por la llave primaria
router.post('/genEstado',genEstado.add);// envia insert
router.put('/genEstado',genEstado.update);// put actuliza
router.delete('/genEstado/:id',genEstado.delete);//elimina

// router.get('/genEstado/consult/pdf',genEstado.genPdf);

router.get('/genCompania',genCompania.get);// llama todos los campos de la tabla estado
router.get('/genCompania/:id',genCompania.getById);// consulta el campo ID  por la llave primaria
router.post('/genCompania',genCompania.add);// envia insert
router.put('/genCompania',genCompania.update);// put actuliza
router.delete('/genCompania/:id',genCompania.delete);//elimina

router.get('/genCompaniaSede',genCompaniaSede.get);// llama todos los campos de la tabla estado
router.get('/genCompaniaSede/:id',genCompaniaSede.getById);// consulta el campo ID  por la llave primaria
router.post('/genCompaniaSede',genCompaniaSede.add);// envia insert
router.put('/genCompaniaSede',genCompaniaSede.update);// put actuliza
router.delete('/genCompaniaSede/:id',genCompaniaSede.delete);//elimina


const genEstado2 = require('../controllers/genEstado2')
router.get('/genEstado2',genEstado2.get);// llama todos los campos de la tabla estado
router.get('/genEstado2/:id',genEstado2.getById);// consulta el campo ID  por la llave primaria
router.post('/genEstado2',genEstado2.add);// envia insert
router.put('/genEstado2',genEstado2.update);// put actuliza
router.delete('/genEstado2/:id',genEstado2.delete);//elimina



router.get('/genUsuarios',genUsuarios.get);
router.get('/genUsuarios/:id',genUsuarios.getById);
router.post('/genUsuarios',genUsuarios.add);
router.put('/genUsuarios',genUsuarios.update);
router.delete('/genUsuarios/:id',genUsuarios.delete);

router.get('/genCasa',genCasa.get);
router.get('/genCasa/:id',genCasa.getById);
router.post('/genCasa',genCasa.add);
router.put('/genCasa',genCasa.update);
router.delete('/genCasa/:id',genCasa.delete);

router.get('/genTablas',genTablas.get);
router.get('/genTablas/:id',genTablas.getById);
router.post('/genTablas',genTablas.add);
router.put('/genTablas',genTablas.update);
router.delete('/genTablas/:id',genTablas.remove);

router.get('/companiaSedeArea',companiaSedeArea.get);
router.get('/companiaSedeArea/:id',companiaSedeArea.getById);
router.post('/companiaSedeArea',companiaSedeArea.add);
router.put('/companiaSedeArea',companiaSedeArea.update);
router.delete('/companiaSedeArea/:id',companiaSedeArea.delete);
router.get('/companiaSedeArea/consult/estadoActivo',companiaSedeArea.getByActive);

router.get('/manTipoEquipo',manTipoEquipo.get);
router.get('/manTipoEquipo/:id',manTipoEquipo.getById);
router.post('/manTipoEquipo',manTipoEquipo.add);
router.put('/manTipoEquipo',manTipoEquipo.update);
router.delete('/manTipoEquipo/:id',manTipoEquipo.delete);
router.get('/manTipoEquipo/consult/estadoActivo',manTipoEquipo.getByActive);

router.get('/genMarca',genMarca.get);
router.get('/genMarca/:id',genMarca.getById);
router.post('/genMarca',genMarca.add);
router.put('/genMarca',genMarca.update);
router.delete('/genMarca/:id',genMarca.delete);
router.get('/genMarca/consult/estadoActivo',genMarca.getByActive);

router.get('/genMarcaLinea',genMarcaLinea.get);
router.get('/genMarcaLinea/:id',genMarcaLinea.getById);
router.post('/genMarcaLinea',genMarcaLinea.add);
router.put('/genMarcaLinea',genMarcaLinea.update);
router.delete('/genMarcaLinea/:id',genMarcaLinea.delete);
router.get('/genMarcaLinea/consult/estadoActivo',genMarcaLinea.getByActive);

router.get('/getTipoCombustible',getTipoCombustible.get);
router.get('/getTipoCombustible/:id',getTipoCombustible.getById);
router.post('/getTipoCombustible',getTipoCombustible.add);
router.put('/getTipoCombustible',getTipoCombustible.update);
router.delete('/getTipoCombustible/:id',getTipoCombustible.delete);
router.get('/getTipoCombustible/consult/estadoActivo',getTipoCombustible.getByActive);

router.get('/genUnidadMedida',genUnidadMedida.get);
router.get('/genUnidadMedida/:id',genUnidadMedida.getById);
router.post('/genUnidadMedida',genUnidadMedida.add);
router.put('/genUnidadMedida',genUnidadMedida.update);
router.delete('/genUnidadMedida/:id',genUnidadMedida.delete);
router.get('/genUnidadMedida/consult/estadoActivo',genUnidadMedida.getByActive);

router.get('/manTarea',manTarea.get);
router.get('/manTarea/:id',manTarea.getById);
router.post('/manTarea',manTarea.add);
router.put('/manTarea',manTarea.update);
router.delete('/manTarea/:id',manTarea.delete);
router.get('/manTarea/consult/estadoActivo',manTarea.getByActive);

router.get('/testPdf',testPdf.genPdfPipe);

router.get('/genUnidad',genUnidad.get);
router.get('/genUnidad/:id',genUnidad.getById);
router.post('/genUnidad',genUnidad.add);
router.put('/genUnidad',genUnidad.update);
router.delete('/genUnidad/:id',genUnidad.delete);

router.get('/genPerfil',genPerfil.get);
router.get('/genPerfil/:id',genPerfil.getById);
router.post('/genPerfil',genPerfil.add);
router.put('/genPerfil',genPerfil.update);
router.delete('/genPerfil/:id',genPerfil.delete);


module.exports = router;