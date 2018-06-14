const {Chores} = require('../chores/model');
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

function ChoresService(){
   
    this.create = function(choreObj){
        return new Promise(async(resolve,reject)=>{
            try{
                let{
                    choreName,
                    choreCompleted,
                    creator,
                    date
                } = choreObj;
                let newChore = await Chores
                .create({
                    choreName,
                    choreCompleted,
                    creator,
                    date
                });
                resolve(newChore);

            } catch(err) {
                console.log('Error');
                reject('Mongoose error');
            }
        });
    },
    this.update = function(id, chore){
        return new Promise(async (resolve, reject)=>{
            const updated = {};
            const updateableFields = ['choreCompleted'];
            updateableFields.forEach(field => {
                if (field in chore) {
                    updated[field] = chore[field];
                }
            });
            let updatedChore = Chores
            .findByIdAndUpdate(id, {
                $set: updated},
                {
                    new: true
                });
                resolve(updatedChore);
        });
    },
    this.remove = function(id){
        return new Promise(async(resolve, reject)=> {
            let deleteChore = await Chores
                .findByIdAndRemove(id);
                resolve(deleteChore)
        });
    }
}
module.exports = new ChoresService();