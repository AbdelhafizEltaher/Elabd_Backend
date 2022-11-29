const mongoose = require("mongoose")

var ProductSchema = mongoose.Schema({
    Name: { type: String, required: true, unique: true, toLowerCase: true, trim: true },
    Image: { type: String, required: true },
    Amount:{type: Number , default:1},
    Price: { type: Number },
    Categories: { type: Array },
},    { timestamps: true })


var Product = mongoose.model("Product", ProductSchema)
module.exports = Product