const Creature = require('./../models/Creature');

exports.create = (creatureData)=> 
Creature.create(creatureData)

exports.getAll = () => Creature.find()

exports.getSingleCreature = (creatureId)=> 
Creature.findById(creatureId).populate('votes')

exports.update = (creatureId, creatureData) => Creature.findByIdAndUpdate(creatureId,creatureData)

exports.delete = (creatureId) => Creature.findByIdAndDelete(creatureId)

exports.getMyCreatures = (ownerId)=> Creature.find({owner: ownerId}).populate('owner')

exports.addVotesToCreature = async(creatureId,userId) =>{

    //!   AZ SAM GO PISAL!!! ACO NE BACA SI VISH LEKCIQTA
    const creature = await this.getSingleCreature(creatureId)
    if(creature.votes.includes(userId)){
        return
    }

    creature.votes.push(userId)
    return creature.save()
}