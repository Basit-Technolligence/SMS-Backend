const express = require('express');
const Admin = require("../models/admin");
const db = require('../database/admin');
const { response } = require('express');


const addTeacher = async (req, res) => {
    try {
      await db.collection("teachers").add(req.body);
      res.send("Data Added"); 
    } catch (e) {
      res.send(e);
    }
  };

  const getTeacher = async (req, res) => {
    try {
      const response = await db.collection("teachers").get();
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

  const getTeacherbyId = async (req, res) => {
    try {
      const response = await db.collection("teachers").doc(req.params.id).get();
      const data = await response.data();
      data.id = req.params.id;
      res.send(data);
    } catch (e) {
      res.send(e);
    }
  };


  const updateTeacher = async (req, res) => {
    try {
      await db.collection("teachers").doc(req.params.id).update(req.body);
      res.send("Updated Data");
    } catch (e) {
      res.send(e);
    }
  };

  const deleteTeacher = async (req, res) => {
    try {
      await db.collection("teachers").doc(req.params.id).delete();
      res.send("Deleted Data");
    } catch (e) {
      res.send(e);
    }
  };


exports.addTeacher = addTeacher;
exports.getTeacher = getTeacher;
exports.getTeacherbyId = getTeacherbyId;
exports.deleteTeacher = deleteTeacher;
exports.updateTeacher = updateTeacher;
