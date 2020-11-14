var pdf =  require("pdf-creator-node");
var fs =  require('fs');
var inWords = require('./inWords')
const createPDF= (data,response)=>{
    try{    
        data.inWords = inWords(data.fee.substring(4,data.fee.length));
        data.date = new Date();
    console.log('pdf',data)
    var html = fs.readFileSync(`${__dirname}/pdfDesign.html`, 'utf8');
 
    var options = {
        format: "A4",
        orientation: "landscape",
        border: "10mm"
    };

    var users = data;
    const homeDir = require('os').homedir();
    var document = {
        html: html,
        data: {
            users: users
        },
        path: `./challans/${data.name}_${data.currentClass}_Gr no. ${data.gr}.pdf`
    };
    pdf.create(document, options)
        .then((res) => {
           response.send(`${data.name}_${data.currentClass}_Gr no. ${data.gr}.pdf`);
        })
        .catch(error => {
            console.error(error);
            response.send( "ERROR");
        });
        return document
    }catch(e){
        console.log(e)
    }
}

module.exports = createPDF;