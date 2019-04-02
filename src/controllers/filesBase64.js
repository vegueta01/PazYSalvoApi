
const fs   = require('fs');

exports.getFile = async (req, res,next)=>{
    
    var data =fs.readFileSync("C:/Users/felipe.buitrago/Documents/Paz y salvo/PazYSalvoApi/soporteAsignacciones/1553619638379_aronem2.png");
    var img = new Buffer(data, 'base64');

   res.writeHead(200, {
     'Content-Type': 'image/png',
     'Content-Length': img.length
   });
   res.end(img); 
   return;
}