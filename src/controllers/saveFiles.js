const {IncomingForm}  = require('formidable');
const fs_extra   = require('fs-extra');
let config = require('../config');
exports.test = async(req, res, next)=>{

    const form = new IncomingForm();
    form.on('file', async (fields, file) => {
        // res.writeHead(200, {'content-type': 'text/plain'});
        // res.write('received upload:\n\n');
        // res.end(util.inspect({fields, files: file}));
      // Do something with the file
      // e.g. save it to the database
      // you can access it using file.path
      console.log({'file': file});
      console.log({temp_path:file.path});
      let path = config.folderAllocation+'/'+ file.name;
      console.log({path});
      
      await fs_extra.copy(file.path,path)
    //   console.log({file_name});
      
    });
    form.on('end', () => {
      res.json();
        // /* Temporary location of our uploaded file */
        // var temp_path = this.openedFiles[0].path;
        // /* The file name of the uploaded file */
        // var file_name = this.openedFiles[0].name;
        // /* Location where we want to copy the uploaded file */
        // var new_location = "/Users/testUser/test_hold_files/";
        
        // console.log({temp_path});
        // console.log({file_name});
        
        // fs_extra.copy(temp_path, new_location + file_name, function(err) {
        //     if (err) {
        //         console.error(err);
        //     } else {
        //         console.log("success!")
        //     }
        // });
    });
    form.parse(req);
    
}
/**
 * guarda los archivos de las asignaciones en el servidor
 */
exports.saveFileAllocation = async (req, res, next)=>{
    try {
        const form = new IncomingForm();
        form.on('file', async (fields, file) => {
          // Do something with the file
          // e.g. save it to the database
          // you can access it using file.path
          console.log({file});
          console.log('type', file.type);
          console.log({fields});
          console.log({temp_path:file.path});
          let path ='';
            if(req.query.id ){
                 path = config.folderAllocation+'/'+req.query.id +'query_'+file.name;
            }
            if(req.params.id ){
                 path = config.folderAllocation+'/'+req.params.id +'params'+file.name;
            }
            
            if(path!== ''){
                await fs_extra.copy(file.path,path)
            }
          console.log({path});
          
         
        });
        form.on('end', () => {
          res.json();
    
        });
        form.parse(req);
    } catch (error) {
        res.sendStatus(500);
    }
}

/**
 * elimina los archivos de las asignaciones en el servidor
 */
exports.deleteFileAllocation = async (req, res, next)=>{
    try {
        console.log({body:req.body});
         
        const form = new IncomingForm();
        form.on('file', async (fields, file) => {
          // Do something with the file
          // e.g. save it to the database
          // you can access it using file.path
          console.log('fields', file.fields);
          console.log({temp_path:file.path});
          let path = config.folderAllocation+'/'+ file.name;
          console.log({path});
          
        //   await fs_extra.copy(file.path,path)
        });
        form.on('end', () => {
          res.json();
    
        });
        form.parse(req);
    } catch (error) {
        res.sendStatus(500);
    }
}
/**
 * guarda los archivos de las devoluciones en el servidor
 */
exports.saveFileReturn = async (req, res, next)=>{
    console.log('saveFileReturn');
    
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
        res.sendStatus(500);
    }
   
}