const mongoose = require("../db/conn")
const {Schema} = mongoose

const Pet = mongoose.model(
    'Pet',
    new Schema({
        name: {
            type: String,
            required: true
        },
        age: {
            type: Number,
            required: true
        },
        weight: {
            type: Number,
            required: true
        },
        color: {
            type: String,
            required: true
        },
        images: {
            type: Array,
            required: true
        },
        available: {
            type: Boolean
        },
        // Dessa forma não preciso fazer relacionamento como no SQL
        user: Object, // Inserir o usuário que está levando a doação o pet 
        adopter: Object // A pessoa que adotou o pet
    }, 
    {timestamps: true}
    )
)

module.exports = Pet