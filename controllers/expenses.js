const express = require('express');
const Admin = require("../models/admin");
const db = require('../database/admin');
const { response } = require('express');

const addExpense = async (req, res) => {
 try {
     await db.collection("expenses").add(req.body);
      res.send("Inserted Successfully");
  } catch (e) {
    res.send("Fail to Insert");
  }
};

const getAllExpenses = async(req,res)=>{
    try{
        const response = await db.collection("expenses").get();
        const allData = [];
        response.forEach((doc) =>{
            document = doc.data();
            document.id = doc.id;
            allData.push(document);
        });
        res.send(allData);
    }catch(e){
        res.send("Fail to geet");
    }
}


const updateExpenses = async (req,res)=>{
    try{
        console.log(req.body)
        const response = await db.collection("expenses").doc(req.params.id).update(req.body);
        res.send("Updated Successfully");
    }catch(e){
        res.send("Failed to Update!")
    }
}

const deleteExpenses = async (req,res)=>{
    try{
        const response = await db.collection("expenses").doc(req.params.id).delete();
        res.send("Deleted Successsfully");
    }catch(e){
        res.send("Failed to Delete");
    }
}


const getExpensebyId = async (req,res)=>{
    try{
        const response = await db.collection("expenses").doc(req.params.id).get();
        const rdata = await response.data();

        res.send(rdata);

    }catch(e){
        res.send("Failed to get daata by ID");
    }
}

exports.addExpense = addExpense;
exports.getExpensebyId = getExpensebyId;
exports.getAllExpenses = getAllExpenses;
exports.updateExpenses = updateExpenses;
exports.deleteExpenses = deleteExpenses;