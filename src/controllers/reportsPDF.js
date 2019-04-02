let dbConfig = require('../config');

exports.genPdfPipe = async (req, res, next)=>{
    try {
        // let users = await getTest();
        var fs = require('fs');
        var pdf = require('html-pdf');
        var requestify = require('requestify');
        // var html = fs.readFileSync('http://localhost:3000', 'utf8');
         
        var options = {
            format: 'Letter',
            // border: "10"
        };
        
        let html = await requestify.get(dbConfig.localUrl+'/allocationReport/?ID='+req.query.ID);

        // pdf.create(html.body, options).toFile('./businesscard.pdf', function(err, resp) {
        // if (err) return console.log(err);
        // console.log(resp); 
        // res.send(resp);
        // });

        pdf.create(html.body,options).toStream(function(err, stream){
            if (err){ res.status(500).send({error:err.message}); return console.log(err);}
            stream.pipe(res);
          });
           
        
    } catch (error) {
        console.log({error:error});        
        res.status(500).send({error:error.message});
    }
}

exports.hardwareAllocation = async (req, res, next)=>{
    try {
        // let users = await getTest();
        var fs = require('fs');
        var pdf = require('html-pdf');
        var requestify = require('requestify');
        // var html = fs.readFileSync('http://localhost:3000', 'utf8');
         
        var options = {
            format: 'Letter',
            // border: "10"
        };
        
        let html = await requestify.get(dbConfig.localUrl+'/allocationReport/?ID='+req.query.ID);

        // pdf.create(html.body, options).toFile('./businesscard.pdf', function(err, resp) {
        // if (err) return console.log(err);
        // console.log(resp); 
        // res.send(resp);
        // });

        pdf.create(html.body,options).toStream(function(err, stream){
            if (err){ res.status(500).send({error:err.message}); return console.log(err);}
            stream.pipe(res);
          });
           
        
    } catch (error) {
        console.log({error:error});        
        res.status(500).send({error:error.message});
    }
}


exports.hardwareReturn = async (req, res, next)=>{
    try {
        // let users = await getTest();
        var fs = require('fs');
        var pdf = require('html-pdf');
        var requestify = require('requestify');
        // var html = fs.readFileSync('http://localhost:3000', 'utf8');
         
        var options = {
            format: 'Letter',
            // border: "10"
        };
        
        let html = await requestify.get(dbConfig.localUrl+'/returnReport/?ID='+req.query.ID);

        pdf.create(html.body,options).toStream(function(err, stream){
            if (err){ res.status(500).send({error:err.message}); return console.log(err);}
            stream.pipe(res);
          });
           
        
    } catch (error) {
        console.log({error:error});        
        res.status(500).send({error:error.message});
    }
}