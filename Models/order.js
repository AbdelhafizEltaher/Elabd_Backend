const mongoose = require("mongoose")
var OrderSchema = mongoose.Schema({

    UserId: {type: mongoose.Schema.ObjectId,ref:"User",required: true},
    Products: [{ProductID:{type: mongoose.Schema.ObjectId,ref:"Product" },Quantity:{type:Number,default:1}}],
    Amount: {type:Number,required:true},
    Address:{type:String,required:true}

}, 

{ timestamps: true })


var Order = mongoose.model("Order", OrderSchema)
module.exports = Order