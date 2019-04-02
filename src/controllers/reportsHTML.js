const oracleController = require('../services/oracleControllers');

exports.hardwareAllocation = async (req, res, next)=>{

    let sqlAssignations = `SELECT PST_TDE_TRANSACCION_DETALLES.PST_TDE_CANTIDAD AS Cantidad,
    PST_ELE_ELEMENTOS.PST_ELE_NOMBRE_EQUIPO AS Item,
    PST_MEL_MARCA_ELEMENTO.PST_MEL_NOMBRE AS Marca,
    PST_ELE_ELEMENTOS.PST_ELE_SERIAL AS Serial,
    PST_TDE_OBSERVACIONES AS Estado  
    FROM PST_TDE_TRANSACCION_DETALLES
    INNER JOIN PST_ELE_ELEMENTOS ON PST_ELE_ELEMENTOS.PST_ELE_ID = PST_TDE_TRANSACCION_DETALLES.PST_TDE_ELE_ID
    INNER JOIN PST_MEL_MARCA_ELEMENTO ON PST_MEL_MARCA_ELEMENTO.PST_MEL_ID = PST_ELE_ELEMENTOS.PST_ELE_MEL_ID
    WHERE PST_TDE_TRANSACCION_DETALLES.PST_TDE_TRA_ID = ${req.query.ID}`;

    let sqlAssignation = `SELECT 
    PST_TRN_OBSERVACIONES, 
    PST_TRA_FECHA, 
    PST_TRN_EMP_ID,
    GEN_EMP_EMPLEADO.GEN_EMP_NUMERO_DOCUMENTO, 
    GEN_EMP_EMPLEADO.GEN_EMP_NOMBRE1,
    GEN_EMP_EMPLEADO.GEN_EMP_NOMBRE2,
    GEN_EMP_EMPLEADO.GEN_EMP_APELLIDO1, 
    GEN_EMP_EMPLEADO.GEN_EMP_APELLIDO2, 
    GEN_EMP_EMPLEADO.GEN_EMP_SEXO,
    GEN_EMP_EMPLEADO.GEN_EMP_NUMERO_DOCUMENTO
    PST_TRN_TTR_ID FROM PST_TRN_TRANSACCION
 INNER JOIN GEN_EMP_EMPLEADO ON GEN_EMP_EMPLEADO.GEN_EMP_ID = PST_TRN_TRANSACCION.PST_TRN_EMP_ID
 WHERE PST_TRN_ID = ${req.query.ID}`;
    
    let [assignations,assignation] =  await Promise.all([oracleController.executeSqlAndExtractJSON(sqlAssignations),oracleController.executeSqlAndExtractJSON(sqlAssignation)])
    const assignation0 = assignation[0];
    const employeeName =`${assignation0.GEN_EMP_NOMBRE1} ${assignation0.GEN_EMP_NOMBRE2} ${assignation0.GEN_EMP_APELLIDO1} ${assignation0.GEN_EMP_APELLIDO2}`
    // const employeeDocument = assignation0.GEN_EMP_NUMERO_DOCUMENTO
    // const observation 
    // console.log(JSON.stringify(assignations, null, "\t"));
    // new Date().toLocaleString()
    res.render('allocationReport', 
    {
      // title: 'Asignación de equipos',
      tableTitle:'Equipos entregados',
      city:'Bogotá',
      date: assignation0.PST_TRA_FECHA.toLocaleString(),
      employeeName,
      employeeCharge:'',
      employeeDocument:assignation0.GEN_EMP_NUMERO_DOCUMENTO,
      array:assignations,
      observation:assignation0.PST_TRN_OBSERVACIONES,
      delivery:'Camilo santamría',
      deliveryCharge:'Ing. Soporte',
      fields:getFields(assignations),
    }); 
    return true;
}

exports.hardwareReturn = async (req, res, next)=>{

  let sqlAssignations = `SELECT PST_TDE_TRANSACCION_DETALLES.PST_TDE_CANTIDAD AS Cantidad,
  PST_ELE_ELEMENTOS.PST_ELE_NOMBRE_EQUIPO AS Item,
  PST_MEL_MARCA_ELEMENTO.PST_MEL_NOMBRE AS Marca,
  PST_ELE_ELEMENTOS.PST_ELE_SERIAL AS Serial,
  PST_TDE_OBSERVACIONES AS Estado  
  FROM PST_TDE_TRANSACCION_DETALLES
  INNER JOIN PST_ELE_ELEMENTOS ON PST_ELE_ELEMENTOS.PST_ELE_ID = PST_TDE_TRANSACCION_DETALLES.PST_TDE_ELE_ID
  INNER JOIN PST_MEL_MARCA_ELEMENTO ON PST_MEL_MARCA_ELEMENTO.PST_MEL_ID = PST_ELE_ELEMENTOS.PST_ELE_MEL_ID
  WHERE PST_TDE_TRANSACCION_DETALLES.PST_TDE_TRA_ID = ${req.query.ID}`;

  let sqlAssignation = `SELECT 
  PST_TRN_OBSERVACIONES, 
  PST_TRA_FECHA, 
  PST_TRN_EMP_ID,
  GEN_EMP_EMPLEADO.GEN_EMP_NUMERO_DOCUMENTO, 
  GEN_EMP_EMPLEADO.GEN_EMP_NOMBRE1,
  GEN_EMP_EMPLEADO.GEN_EMP_NOMBRE2,
  GEN_EMP_EMPLEADO.GEN_EMP_APELLIDO1, 
  GEN_EMP_EMPLEADO.GEN_EMP_APELLIDO2, 
  GEN_EMP_EMPLEADO.GEN_EMP_SEXO,
  GEN_EMP_EMPLEADO.GEN_EMP_NUMERO_DOCUMENTO
  PST_TRN_TTR_ID FROM PST_TRN_TRANSACCION
INNER JOIN GEN_EMP_EMPLEADO ON GEN_EMP_EMPLEADO.GEN_EMP_ID = PST_TRN_TRANSACCION.PST_TRN_EMP_ID
WHERE PST_TRN_ID = ${req.query.ID}`;
  
  let [assignations,assignation] =  await Promise.all([oracleController.executeSqlAndExtractJSON(sqlAssignations),oracleController.executeSqlAndExtractJSON(sqlAssignation)])
  const assignation0 = assignation[0];
  const employeeName =`${assignation0.GEN_EMP_NOMBRE1} ${assignation0.GEN_EMP_NOMBRE2} ${assignation0.GEN_EMP_APELLIDO1} ${assignation0.GEN_EMP_APELLIDO2}`
  // const employeeDocument = assignation0.GEN_EMP_NUMERO_DOCUMENTO
  // const observation 
  // console.log(JSON.stringify(assignations, null, "\t"));
  // new Date().toLocaleString()
  res.render('returnReport', 
  {
    // title: 'Asignación de equipos',
    tableTitle:'Devolución',
    city:'Bogotá',
    date: assignation0.PST_TRA_FECHA.toLocaleString(),
    employeeName,
    employeeCharge:'',
    employeeDocument:assignation0.GEN_EMP_NUMERO_DOCUMENTO,
    array:assignations,
    observation:assignation0.PST_TRN_OBSERVACIONES,
    delivery:'Camilo santamría',
    deliveryCharge:'Ing. Soporte',
    fields:getFields(assignations),
  }); 
  return true;
}

let getFields =(data)=>{
    let fields = [];
    for (const key in data[0]) {
        fields.push(key);
    }
    return fields;
}