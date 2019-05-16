const express = require('express');

const server = express();

server.use(express.json());

const db = require("../data/dbConfig");

server.get('/', (req, res) => {
    res.status(200).json({message:'Its working!!!!'});

  });

  server.get('/students', (req, res) => {
    db('students')
    .then(students=>{
      res.status(200).json(students)
    }).catch(err =>{
      console.log(err)
    })
  });

  server.post('/students', (req, res) => {
    db('students')
    .insert(req.body,'id')
    .then(student =>{
      res.status(200).json(student)
    })
    .catch(err=>{
      res.status(500).json(err)
    })
  });


module.exports = server;