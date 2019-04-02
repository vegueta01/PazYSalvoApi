const oracleController = require('../services/oracleControllers');
const tableName ="PST_ELE_ELEMENTOS";
const tableId ="PST_ELE_ID";


exports.get = async (req, res, next)=>{
    try {
        // let users = await getTest();
        let users = await oracleController.getList(tableName,req.query);
        res.send(users);
    } catch (error) {
        console.log({error:error});        
        res.status(500).send({error:error.message});
    }
}

exports.getById = async (req, res, next)=>{
    try {
        // let users = await getTest();
        if(!req.params.id){
            res.status(500).send({error:'el id no se ha encontrado como parámetro'});
        }
        let id = {};
        id.value = req.params.id    
        id.name = tableId
        let users = await oracleController.getById(tableName,id);
        res.send(users);
    } catch (error) {
        console.log({error:error});        
        res.status(500).send({error:error.message});
    }
}

exports.add = async (req, res, next)=>{
    try {
        let data = req.body;
        
        data[tableId] = await oracleController.idAutoIncrement(tableName,tableId);
        console.log({data});
        let users = await oracleController.add(tableName,data);
        res.send(users);
    } catch (error) {
        console.log({error:error});        
        res.status(500).send({error:error.message});
    }
}

exports.update = async (req, res, next)=>{
    try {
        // let users = await getTest();
        // if(!req.params.id){
        //     res.status(500).send({error:'el id no se ha encontrado como parámetro'});
        // }
        let id = {};
        id.value = req.body[tableId]; 
        id.name = tableId;
        let data = req.body;
        let users = await oracleController.updateById(tableName,data,id);
        res.send(users);
    } catch (error) {
        console.log({error:error});        
        res.status(500).send({error:error.message});
    }
}

exports.delete = async (req, res, next)=>{
    let id = {};
    id.value = req.params.id    
    id.name = tableId;
    let users = await oracleController.deleteById(tableName,id);
    res.send(users);
    
}

exports.getByActive = async (req, res, next)=>{
    try {
        // let users = await getTest();
        let sql = `SELECT GEN_EST_ID,GEN_EST_TAB_ID, GEN_EST_NOMBRE 
        FROM AEROSAN.GEN_EST_ESTADO
        INNER JOIN AEROSAN.GEN_TAB_TABLAS ON (GEN_TAB_ID = GEN_EST_TAB_ID AND GEN_TAB_ID_NOMBRE_REFERENCIA ='${tableName}' )
        WHERE GEN_EST_REG_ACTIVO = 1
        ORDER BY GEN_EST_NOMBRE`;
        let users = await oracleController.getConsult(sql);
        res.send(users);
    } catch (error) {
        console.log({error:error});        
        res.status(500).send({error:error.message});
    }
}


exports.getAssignedElementsByEmployeeId = async (req, res, next)=>{
    try {
        if(!req.query.EMPLOYEE_ID){
            console.log({error:'req.query.EMPLOYEE_ID no encontrado'});        
            res.status(400).send({error:'id de empleado (EMPLOYEE_ID) no encontrado'});
            return;
        }
        // let users = await getTest();
        let sql = `
        select asigna.NOMBRE_EQUIPO,asigna.EQUIPO_ID,asignaciones, nvl(devoluciones,0)as devoluciones,(asignaciones - nvl(devoluciones,0 )) as total
        from 
        (select PST_ELE_ELEMENTOS.PST_ELE_NOMBRE_EQUIPO AS NOMBRE_EQUIPO,PST_ELE_ELEMENTOS.PST_ELE_ID AS EQUIPO_ID ,sum(PST_TDE_TRANSACCION_DETALLES.PST_TDE_CANTIDAD) as asignaciones,PST_ELE_ELEMENTOS.PST_ELE_ID AS ELE_ID
        from PST_ELE_ELEMENTOS
        inner join PST_TDE_TRANSACCION_DETALLES on PST_TDE_TRANSACCION_DETALLES.PST_TDE_ELE_ID = PST_ELE_ELEMENTOS.PST_ELE_ID
        inner join PST_TRN_TRANSACCION on PST_TRN_TRANSACCION.PST_TRN_ID = PST_TDE_TRANSACCION_DETALLES.PST_TDE_TRA_ID
        where 
        PST_TRN_TRANSACCION.PST_TRN_EMP_ID = ${req.query.EMPLOYEE_ID} and
        PST_TRN_TRANSACCION.PST_TRN_TTR_ID = 1
        group by(PST_ELE_ELEMENTOS.PST_ELE_NOMBRE_EQUIPO,PST_ELE_ELEMENTOS.PST_ELE_ID)
        ) asigna
        
        left join 
        
        (select PST_ELE_ELEMENTOS.PST_ELE_NOMBRE_EQUIPO AS NOMBRE_EQUIPO ,sum(PST_TDE_TRANSACCION_DETALLES.PST_TDE_CANTIDAD) as devoluciones,PST_ELE_ELEMENTOS.PST_ELE_ID AS ELE_ID
        from PST_ELE_ELEMENTOS
        inner join PST_TDE_TRANSACCION_DETALLES on PST_TDE_TRANSACCION_DETALLES.PST_TDE_ELE_ID = PST_ELE_ELEMENTOS.PST_ELE_ID
        inner join PST_TRN_TRANSACCION on PST_TRN_TRANSACCION.PST_TRN_ID = PST_TDE_TRANSACCION_DETALLES.PST_TDE_TRA_ID
        where 
        PST_TRN_TRANSACCION.PST_TRN_EMP_ID = ${req.query.EMPLOYEE_ID} and
        PST_TRN_TRANSACCION.PST_TRN_TTR_ID = 2
        group by(PST_ELE_ELEMENTOS.PST_ELE_NOMBRE_EQUIPO,PST_ELE_ELEMENTOS.PST_ELE_ID)) 
        devolu on devolu.ele_id = asigna.ele_id
        `;
        let users = await oracleController.getConsult(sql);
        res.send(users);
    } catch (error) {
        console.log({error:error});        
        res.status(500).send({error:error.message});
    }
}

exports.getInventoryToals = async (req, res, next)=>{
    try {
        // if(!req.query.EMPLOYEE_ID){
        //     console.log({error:'req.query.EMPLOYEE_ID no encontrado'});        
        //     res.status(400).send({error:'id de empleado (EMPLOYEE_ID) no encontrado'});
        //     return;
        // }
        // let users = await getTest();
        let sql = `
        select asigna.NOMBRE_EQUIPO,asigna.EQUIPO_ID,asignaciones, nvl(devoluciones,0)as devoluciones,total.total_ingresados AS TOTAL_INGRESADOS,(asignaciones - nvl(devoluciones,0 )) as ASIGNACIONES_DEVUELTAS, (total.total_ingresados -(asignaciones - nvl(devoluciones,0 ))) as TOTAL_DISPONIBLES
        from 
         (SELECT PST_ELE_ELEMENTOS.PST_ELE_ID as ele_id, PST_ELE_ELEMENTOS.PST_ELE_NOMBRE_EQUIPO, SUM(PST_INV_INVENTARIO.PST_INV_TOTAL) as total_ingresados FROM PST_ELE_ELEMENTOS
        INNER JOIN PST_INV_INVENTARIO ON PST_INV_INVENTARIO.PST_INV_ELE_ID = PST_ELE_ELEMENTOS.PST_ELE_ID
        GROUP BY PST_ELE_ELEMENTOS.PST_ELE_ID,PST_ELE_ELEMENTOS.PST_ELE_NOMBRE_EQUIPO) total
        
        left join
        
        (select PST_ELE_ELEMENTOS.PST_ELE_NOMBRE_EQUIPO AS NOMBRE_EQUIPO,PST_ELE_ELEMENTOS.PST_ELE_ID AS EQUIPO_ID ,sum(PST_TDE_TRANSACCION_DETALLES.PST_TDE_CANTIDAD) as asignaciones,PST_ELE_ELEMENTOS.PST_ELE_ID AS ELE_ID
        from PST_ELE_ELEMENTOS
        inner join PST_TDE_TRANSACCION_DETALLES on PST_TDE_TRANSACCION_DETALLES.PST_TDE_ELE_ID = PST_ELE_ELEMENTOS.PST_ELE_ID
        inner join PST_TRN_TRANSACCION on PST_TRN_TRANSACCION.PST_TRN_ID = PST_TDE_TRANSACCION_DETALLES.PST_TDE_TRA_ID
        where 
        PST_TRN_TRANSACCION.PST_TRN_TTR_ID = 1
        group by(PST_ELE_ELEMENTOS.PST_ELE_NOMBRE_EQUIPO,PST_ELE_ELEMENTOS.PST_ELE_ID)
        ) asigna on total.ele_id =asigna.ele_id
        left join 
        
        (select PST_ELE_ELEMENTOS.PST_ELE_NOMBRE_EQUIPO AS NOMBRE_EQUIPO ,sum(PST_TDE_TRANSACCION_DETALLES.PST_TDE_CANTIDAD) as devoluciones,PST_ELE_ELEMENTOS.PST_ELE_ID AS ELE_ID
        from PST_ELE_ELEMENTOS
        inner join PST_TDE_TRANSACCION_DETALLES on PST_TDE_TRANSACCION_DETALLES.PST_TDE_ELE_ID = PST_ELE_ELEMENTOS.PST_ELE_ID
        inner join PST_TRN_TRANSACCION on PST_TRN_TRANSACCION.PST_TRN_ID = PST_TDE_TRANSACCION_DETALLES.PST_TDE_TRA_ID
        where         
        PST_TRN_TRANSACCION.PST_TRN_TTR_ID = 2
        group by(PST_ELE_ELEMENTOS.PST_ELE_NOMBRE_EQUIPO,PST_ELE_ELEMENTOS.PST_ELE_ID)) 
        devolu on devolu.ele_id = asigna.ele_id
        `;
        let users = await oracleController.getConsult(sql);
        res.send(users);
    } catch (error) {
        console.log({error:error});        
        res.status(500).send({error:error.message});
    }
}
