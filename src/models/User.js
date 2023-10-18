const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const userSchema = new mongoose.Schema({
    firstName:{type : String, required:true,minLength:3},
    lastName:{type : String, required:true,minLength:3},
    email: {type: String, required:true, unique:true,minLength:10},
    password: {type: String, required:true,minLength:4},
})

// userSchema.path('email').validate(function(emailInput){
//     const email = mongoose.model('User').findOne({emailInput})
//     return !!email
// }, 'Email already exist')

userSchema.virtual('repeatPassword').set(function(value){
    if(value !== this.password){
        throw new Error('password missmatch')
    }
})


userSchema.pre('save', async function(){
    const hash = await bcrypt.hash(this.password, 10)
    this.password = hash
}
)


const User = mongoose.model('User', userSchema)
module.exports = User