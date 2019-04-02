const oracleController = require('../services/oracleControllers');
const tableName ="GEN_ARC_ARCHIVOS";
const tableId ="GEN_ARC_ID";

// ----------- config files ------------------//
const {IncomingForm}  = require('formidable');
const fs_extra   = require('fs-extra');
const config = require('../config');
// const form = new IncomingForm();
const genTablas = require('./genTablas');

const fs   = require('fs');
// ------------- end config files -------------//


// ---------------------------------- crude -------------------------------------------------------------//
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

//----------------------------------------- fin crude ------------------------------------------//


// ---------------------------------------- files ----------------------------------------------//


/**
 * guarda los archivos de las asignaciones en el servidor
 */
exports.saveFile = async (req, res, next)=>{
    try {
        
        if(!req.params.idReferenceTable){
            // res.sendStatus(404);
            res.status(400).send({error:'idReferenceTable no encontrada'});
            console.log('idReferenceTable no encontrada');
            
            return;
        }
        if(!req.params.idReference){
            // res.sendStatus(404);
            res.status(400).send({error:'idReference no encontrada'});
            console.log('idReference no encontrada');            
            return;
        }
        

        let getGetTable = await genTablas.getPromise({GEN_TAB_ID_TABLA_REFERENCIA:req.params.idReferenceTable});
      
        if(getGetTable.rows.length !== 1){
            res.status(400).send({error:`no se ha encontrado el regitro ${req.params.idReferenceTable} en la tabla GEN TABLAS datos: ${getGetTable.rows}`} );
            console.log(`no se ha encontrado el regitro ${req.params.idReferenceTable} en la tabla GEN TABLAS datos: ${JSON.stringify(getGetTable.rows)}`);
            return;
        }
        new IncomingForm().parse(req)
        .on('file', async function(name, file) {
            console.log('Got file:', name);
            // console.log({file});
            // console.log({fields});
            
            let fileName = new Date().getTime() +'_'+file.name;
            let path = getGetTable.rows[0].GEN_TAB_RUTA+'/'+fileName
            
            console.log({path});
   
            let body = {
              GEN_ARC_RUTA:path,
              GEN_ARC_PESO:file.size,
              GEN_ARC_EXTENCION:file.type,
              GEN_ARC_NOMBRE_ORIGINAL:file.name,
              GEN_ARC_NOMBRE:fileName,
              GEN_ARC_ID_REFERENCIA:req.params.idReference,
              GEN_ARC_ID_TABLA_REFERENCIA:req.params.idReferenceTable,
            }
  
            addPromise(body);
  
            await fs_extra.copy(file.path,path)
            
        })
        .on('field', function(name, field) {
            console.log('Got a field:', name);
            console.log({field});
            
        })
        .on('error', function(err) {
            next(err);
        })
        .on('end', async function() {
          
            res.end();
        });
        // form.on('file', async (fields, file) => {
        //   // Do something with the file
        //   // e.g. save it to the database
        //   // you can access it using file.path
        // //   console.log('fields', file.fields);
        //   console.log({temp_path:file.path});
        // //   let path ='';


        // //   let fileName = new Date().getTime() +'_'+file.name;
        // //   let path = getGetTable.rows[0].GEN_TAB_RUTA+'/'+fileName
          
        // //   console.log({path});
 
        // //   let body = {
        // //     GEN_ARC_RUTA:path,
        // //     GEN_ARC_PESO:file.size,
        // //     GEN_ARC_EXTENCION:file.type,
        // //     GEN_ARC_NOMBRE_ORIGINAL:file.name,
        // //     GEN_ARC_NOMBRE:fileName,
        // //     GEN_ARC_ID_REFERENCIA:req.params.idReference,
        // //     GEN_ARC_ID_TABLA_REFERENCIA:req.params.idReferenceTable,
        // //   }

        // //   addPromise(body);

        // //   await fs_extra.copy(file.path,path)
              

        // });
        // form.on('end', async(fields, file) => {

        //     console.log({file});
        //     console.log({fields});
            
        //     let fileName = new Date().getTime() +'_'+file.name;
        //     let path = getGetTable.rows[0].GEN_TAB_RUTA+'/'+fileName
            
        //     console.log({path});
   
        //     let body = {
        //       GEN_ARC_RUTA:path,
        //       GEN_ARC_PESO:file.size,
        //       GEN_ARC_EXTENCION:file.type,
        //       GEN_ARC_NOMBRE_ORIGINAL:file.name,
        //       GEN_ARC_NOMBRE:fileName,
        //       GEN_ARC_ID_REFERENCIA:req.params.idReference,
        //       GEN_ARC_ID_TABLA_REFERENCIA:req.params.idReferenceTable,
        //     }
  
        //     addPromise(body);
  
        //     await fs_extra.copy(file.path,path)
        //   res.json();
    
        // });
        // form.parse(req);
    } catch (error) {
        res.status(500).send({error:error.message});
    }
}

/**
 * carga de las asignaciones en el servidor
 */
exports.getFile = async (req, res, next)=>{
    console.log('getFile');
    
    try {
        
        if(!req.params.idReferenceTable){
            // res.sendStatus(404);
            res.status(400).send({error:'idReferenceTable no encontrada'});
            console.log('idReferenceTable no encontrada');
            
            return;
        }
        if(!req.params.idReference){
            // res.sendStatus(404);
            res.status(400).send({error:'idReference no encontrada'});
            console.log('idReference no encontrada');            
            return;
        }

        let resp = await getPromise(
            {
                GEN_ARC_ID_REFERENCIA:req.params.idReference,
                GEN_ARC_ID_TABLA_REFERENCIA:req.params.idReferenceTable,
            })
        // console.log(JSON.stringify(resp,null,'\t'));       
        for (let i = 0; i < resp.rows.length; i++) {
           resp.rows[i].URL = `${config.localUrl}/download/${resp.rows[i].GEN_ARC_ID}`;            
        } 
        res.send(resp)
        return;
        // let getGetTable = await genTablas.getPromise({GEN_TAB_ID_TABLA_REFERENCIA:req.params.idReferenceTable});
      
        // if(getGetTable.rows.length !== 1){
        //     res.status(400).send(`no se ha encontrado el regitro ${req.params.idReferenceTable} en la tabla GEN TABLAS datos: ${getGetTable.rows}` );
        //     console.log(`no se ha encontrado el regitro ${req.params.idReferenceTable} en la tabla GEN TABLAS datos: ${JSON.stringify(getGetTable.rows)}`);
        //     return;
        // }

        // form.on('file', async (fields, file) => {
        //   // Do something with the file
        //   // e.g. save it to the database
        //   // you can access it using file.path
        // //   console.log('fields', file.fields);
        //   console.log({temp_path:file.path});
        // //   let path ='';
        //   let fileName = new Date().getTime() +'_'+file.name;
        //   let path = getGetTable.rows[0].GEN_TAB_RUTA+'/'+fileName
          
        //   console.log({path});
 
        //   let body = {
        //     GEN_ARC_RUTA:path,
        //     GEN_ARC_PESO:file.size,
        //     GEN_ARC_EXTENCION:file.type,
        //     GEN_ARC_NOMBRE_ORIGINAL:file.name,
        //     GEN_ARC_NOMBRE:fileName,
        //     GEN_ARC_ID_REFERENCIA:req.params.idReference,
        //     GEN_ARC_ID_TABLA_REFERENCIA:req.params.idReferenceTable,
        //   }

        //   addPromise(body);

        //   await fs_extra.copy(file.path,path)
              

        // });
        // form.on('end', () => {
        //   res.json();
    
        // });
        // form.parse(req);
    } catch (error) {
        res.status(500).send({error:error.message});
    }
}

/**
 * elimina los archivos de las asignaciones en el servidor
 */
exports.deleteFile = async (req, res, next)=>{
    try {        
        if(!req.params.id){
            // res.sendStatus(404);
            res.status(400).send({error:'id no encontrada como parámetro'});
            console.log('id no encontrada como parámetro');            
            return;
        }
        // if(!req.params.idReference){
        //     // res.sendStatus(404);
        //     res.status(400).send({error:'idReference no encontrada'});
        //     console.log('idReference no encontrada');            
        //     return;
        // }

        // let resp = await getPromise(
        //     {
        //         GEN_ARC_ID_REFERENCIA:req.params.idReference,
        //         GEN_ARC_ID_TABLA_REFERENCIA:req.params.idReferenceTable,
        //     })
        // // console.log(JSON.stringify(resp,null,'\t'));       
        // for (let i = 0; i < resp.rows.length; i++) {
        //    resp.rows[i].URL = `${config.localUrl}/download/${resp.rows[i].GEN_ARC_ID}`;            
        // } 
        let respGet = await getByIdPromise(req.params.id);
        if(respGet.rows !== 1){
            try {
                fs.unlinkSync(respGet.rows[0].GEN_ARC_RUTA)
            } catch (error) {
                console.log({error});                
                res.status(400).send({error:`No se pudo eliminar el archivo ${respGet.rows[0].GEN_ARC_NOMBRE_ORIGINAL}`});
                return;
            }
            
            let resp = await removePromise(req.params.id)
            res.send(resp)
            return;
        }else{

            res.status(400).send({error:'hay una inconsistencia en el registro'+respGet.rows});
            return;
        }
       
      
    } catch (error) {
        console.log({error});        
        res.status(500).send({error:error.message});
    }
}
/**
 * guarda los archivos de las devoluciones en el servidor
 */
exports.saveFileReturn = async (req, res, next)=>{
    try {
        const form = new IncomingForm();
        form.on('file', async (fields, file) => {
          // Do something with the file
          // e.g. save it to the database
          // you can access it using file.path
          console.log('fields', file.fields);
          console.log({temp_path:file.path});
          let path = config.folderReturn+'/'+ file.name;
          console.log({path});
          
          await fs_extra.copy(file.path,path)
        });
        form.on('end', () => {
          res.json();
    
        });
        form.parse(req);
    } catch (error) {
        res.status(500).send({error:error.message});
    }
   
}





exports.downloadFile = async (req, res,next)=>{
    if(!req.params.fileId){
        res.status(400).send({error:'fileId no encontrada como parámetro'});
        console.log('idReferenceTable no encontrada');        
        return;
    }
    let recordFile = await getByIdPromise(req.params.fileId);
    var data =fs.readFileSync(recordFile.rows[0].GEN_ARC_RUTA);
    var img = new Buffer(data, 'base64');

   if(recordFile.rows[0].GEN_ARC_EXTENCION === 'application/octet-stream'){//TODO:seleccionar unicamente diferente de pdf e imágen
        res.writeHead(200, {
            'Content-Type': recordFile.rows[0].GEN_ARC_EXTENCION,
            'Content-Length': img.length,
            "Content-Disposition": "attachment; filename=" + recordFile.rows[0].GEN_ARC_NOMBRE_ORIGINAL
        });
        res.end(img); 
    }else{
        res.writeHead(200, {
            'Content-Type': recordFile.rows[0].GEN_ARC_EXTENCION,
            'Content-Length': img.length,
            // "Content-Disposition": "attachment; filename=" + recordFile.rows[0].GEN_ARC_NOMBRE_ORIGINAL
        });
        res.end(img); 
    }
   return;
}