var pdf =  require("pdf-creator-node");
var fs =  require('fs');
var inWords = require('./inWords')
const createPDF= (data)=>{
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
        path: `${homeDir}/challans/${data.name}_${data.currentClass}_Gr no. ${data.gr}.pdf`
    };
    pdf.create(document, options)
        .then(res => {
           console.log(res);
           console.log('doc',document.data)
           return "DONE";
        })
        .catch(error => {
            console.error(error);
            return "ERROR :";
        });
        return document
    }catch(e){
        console.log(e)
    }
}

module.exports = createPDF;