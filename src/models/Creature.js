const mongoose = require('mongoose');



const creatureSchema = new mongoose.Schema({
name:{type: String,required: true,minLength:2,unique: true},
species:{type: String,required: true,minLength:3},
skinColor:{type: String,required: true,minLength:3},
eyeColor:{type: String,required: true,minLength:3},
image:{type: String,required: true,match:[/^https?:\/\/.+/,"provide valid creature image link!"]},
description:{type: String,required: true,minLength:5,maxLength:500},
votes:[{
    type: mongoose.Types.ObjectId,
    ref:'User'
}],
owner:{
    type: mongoose.Types.ObjectId,
    ref:'User'
},
// votes:{type: String,},
// owner:{type: String},
})

const Creature = mongoose.model('Creature', creatureSchema);

module.exports = Creature