'use strict';
const mongoose = require('mongoose');
var Schema = mongoose.Schema;

// user schema
const ChoresSchema = mongoose.Schema({
   choreName: {type: String},
   choreCompleted: {type:String},
   creator: {type: String},
   date: {type: String}

});

ChoresSchema.methods.serialize = function() {
    return {
       choreName: this.choreName,
       choreCompleted: this.choreCompleted,
       creator: this.creator,
       date: this.date
    };
};


const Chores = mongoose.model('Chores', ChoresSchema);

module.exports = {Chores};

