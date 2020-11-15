const { response } = require("express");
const db = require("../database/admin");
const createPDF = require('./pdf')
const fs = require('fs');

const addStudent = async (req, res) => {
  try {
    await db.collection("students").add(req.body);
    res.send("Data Added");
  } catch (e) {
    res.send(e);
  }
};

const getStudentById = async (req, res) => {
  try {
    const response = await db.collection("students").doc(req.params.id).get();
    const data = await response.data();
    data.id = req.params.id;
    res.send(data);
  } catch (e) {
    res.send(e);
  }
};

const getStudent = async (req, res) => {
  try {
    const response = await db.collection("students").get();
    const allData = [];
    response.forEach((doc) => {
      document = doc.data();
      document.id = doc.id;
      allData.push(document);
    });
    res.send(allData);
  } catch (e) {
    res.send(e);
  }
};
const updateStudent = async (req, res) => {
  try {
    await db.collection("students").doc(req.params.id).update(req.body);
    res.send("Updated Data");
  } catch (e) {
    res.send(e);
  }
};

const deleteStudent = async (req, res) => {
  try {
    await db.collection("students").doc(req.params.id).delete();
    res.send("Deleted Data");
  } catch (e) {
    res.send(e);
  }
};

const exportPDF = async (req,res)=>{
  try{
    await createPDF(req.body,res);
    // res.send("DONE")
  }catch(e){
    res.send(e);
  }
}
const downloadPDF = async (req,res)=>{
  try{
    const file = __dirname +'\\..\\challans\\'+req.params.fileName;
    res.download(file,req.params.fileName, (err)=>{
      if(err) console.log('error in sending file', err)
    });
    console.log('file',file);
  }catch(e){
    res.send(e)
  }
}

exports.addStudent = addStudent;
exports.getStudentById = getStudentById;
exports.getStudent = getStudent;
exports.updateStudent = updateStudent;
exports.deleteStudent = deleteStudent;
exports.exportPDF = exportPDF;
exports.downloadPDF = downloadPDF;
