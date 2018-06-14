'use strict';

const router = require('express').Router();
const jsonParser = require('body-parser').json();
const mongoose = require('mongoose');
const {Chores} = require('../chores/model');
const ChoresService = require('../services/choresService');
const passport = require('passport');

router.post('/add/chore',jsonParser, async(req,res)=>{
    try{
        let Chores = await ChoresService.create(req.body);
        res.status(201).json(Chores);
    }catch(err){
        res.status(500).json({message: "Problem creating chore."});
    }
})

router.get('/', function(req,res){
    Chores
    .find(function(err, exer){
        if(err){
            console.log(err);
        }
        else {
            res.json(exer);
        }
    });
});
router.get('/:id/:date', function(req,res) {
    Chores
    .find({creator: req.params.id,
              date: req.params.date})
    .exec()
    .then(data => {
        res.json(data)
    })
    .catch(err => { 
        console.error(err);
        res.status(500).json({ error: 'Something went wrong getting specified id chore.'});
    });
});

router.put('/edit/chore/:id', jsonParser, async (req, res) => {
    try{
        let Chores = await ChoresService.update(req.params.id, req.body);
        res.status(204).json(Chores);
    } catch (err) {
        res.status(500).json({message: 'There was a problem updating.'});
      }
});

router.delete('/delete/chore/:id', async (req,res) => {
    try{
        let Chores = await ChoresService.remove(req.params.id);
        res.status(204).json(req.params.id);
     }catch(err){
         res.status(500).json({message: 'Something went wrong in deletion'});
     }
 });




module.exports = router;