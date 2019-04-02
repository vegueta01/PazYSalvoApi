const oracleController = require('../services/oracleControllers');
const tableName ="GEN_TAB_TABLAS";
const tableId ="GEN_TAB_ID";

exports.get = async (req, res, next)=>{
    try {
        // let response = await getTest();
        let response = await getPromise(req.query);
        res.send(response);
        return;
    } catch (error) {
        console.log({error:error});        
        res.status(500).send({error:error.message});
    }
}

/**
 * trae un array con todos los registros de la base de datos
 * @param {JSON} query son los filtros que se desean realizar en la base de datos
 */
let getPromise = async (query)=>{
    try {
        let response = await oracleController.getList(tableName,query)
        return response;
    } catch (error) {
        throw error;
    }
    
}

exports.getPromise = getPromise;

exports.getById = async (req, res, next)=>{
    try {
        // let response = await getTest();
        if(!req.params.id){
            res.status(400).send({error:'el id no se ha encontrado como parámetro'});
        }
        // let id = {};
        // id.value = req.params.id    
        // id.name = tableId
        let response = await getByIdPromise(req.params.id);
        res.send(response);
        return;
    } catch (error) {
        console.log({error:error});        
        res.status(400).send({error:error.message});
    }
}

/**
 * extrae un registro de la base de datos
 * @param {string} idValue valor de el campo id en la tabla
 */
let getByIdPromise = async(idValue)=>{
    try {
        let id = {};
        id.value = idValue    
        id.name = tableId
        let user = await oracleController.getById(tableName,id);
        return user;
    } catch (error) {
        throw error;
    }
}

exports.getByIdPromise = getByIdPromise;

exports.add = async (req, res, next)=>{
    try {
        // let data = req.body;        
        // data[tableId] = await oracleController.idAutoIncrement(tableName,tableId);
        // console.log({data});
        let response = await addPromise(req.body);
        res.send(response);
        return;
    } catch (error) {
        console.log({error:error});        
        res.status(500).send({error:error.message});
    }
}

/**
 * inserta un registro en la base de datos
 * @param {JSON} body datos que se desean agregar a la tabla en la base de datos
 */
let addPromise = async(body)=>{
    try {
        let data = body;        
        data[tableId] = await oracleController.idAutoIncrement(tableName,tableId);
        // console.log({data});
        let response = await oracleController.add(tableName,data);
        return response;
    } catch (error) {
        throw error;
    }
}

exports.addPromise = addPromise;

exports.update = async (req, res, next)=>{
    try {
        // let id = {};
        // id.value = req.body[tableId]; 
        // id.name = tableId;
        // let data = req.body;
        let response = await updatePromise(req.body);
        res.send(response);
        return;
    } catch (error) {
        console.log({error:error});        
        res.status(500).send({error:error.message});
    }
}


/**
 * actualiza un registro de la base de datos cambiando todos los campos que se envían por el body
 * @param {JSON} body datos que se desean actualizar, ADVERTENCIA: debe llevar el nombre del campo id de la tabla
 */
let updatePromise = async (body)=>{
    try {
        let id = {};
        id.value = body[tableId]; 
        id.name = tableId;
        let data = body;
        let response = await oracleController.updateById(tableName,data,id);
        return response;
    } catch (error) {
        throw error;
    }
}

exports.updatePromise = updatePromise;

exports.remove = async (req, res, next)=>{
    try {
        let user = await removePromise(req.params.id);
        res.send(user);
        return;
    } catch (error) {
        res.status(400).send({error:error.message});
    }
}

/**
 * pone en estado eliminado un registro de la tabla 
 * @param {string} idValue id del registro que se desea eliminar
 */
let removePromise = async (idValue)=>{
   try {
        let id = {};
        id.value = idValue    
        id.name = tableId;
        let user = await oracleController.deleteById(tableName,id);
        return user;
   } catch (error) {
       throw error;
   }    
}

exports.removePromise = removePromise;


exports.getByActive = async (req, res, next)=>{
    try {
        let response = await getByActivePromise();
        res.send(response);
        return;
    } catch (error) {
        console.log({error:error});        
        res.status(400).send({error:error.message});
    }
}

let getByActivePromise = async ()=>{
    try {
        // let response = await getTest();
        let sql = `SELECT GEN_EST_ID,GEN_EST_TAB_ID, GEN_EST_NOMBRE 
        FROM AEROSAN.GEN_EST_ESTADO
        INNER JOIN AEROSAN.GEN_TAB_TABLAS ON (GEN_TAB_ID = GEN_EST_TAB_ID AND GEN_TAB_ID_NOMBRE_REFERENCIA ='${tableName}' )
        WHERE GEN_EST_REG_ACTIVO = 1
        ORDER BY GEN_EST_NOMBRE`;
        let response = await oracleController.getConsult(sql);
        return response;
    } catch (error) {
        throw error;
    }
}

exports.getByActivePromise = getByActivePromise;