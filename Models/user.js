const mongoose = require("mongoose")
var bcrypt = require('bcrypt')
var UserSchema = mongoose.Schema({

    FirstName: { type: String, required: true, minlength: 3 },
    LastName: { type: String, required: true, minlength: 3 },
    Email: { type: String, required: true, unique: true },
    MobileNumber: { type: String, required: true, unique: true , minlength : 14 , maxlength : 14},
    Password: { type: String, minlength: 6, required: true },
    Gender: {type: String, required: true },
    FavProducts:[{ type: mongoose.Schema.ObjectId, ref: "Product"}],
    IsAdmin: { type: Boolean, default: false },
    
},{ timestamps: true })

UserSchema.pre('save', async function (next) {
    try {
        var salt =  bcrypt.genSaltSync(10)
        var hashdata = bcrypt.hashSync(this.Password, salt)
        this.Password = hashdata
        next()
    } catch (error) {
        next(error)
    }
})

var User = mongoose.model("User", UserSchema)
module.exports = User