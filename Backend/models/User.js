const mongoose = require("../db/conn")
const {Schema} = mongoose

const User = mongoose.model(
    'User',
    new Schema({
        name: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true
        },
        password: {
            type: String,
            require: true
        },
        image: {
            type: String
        },
        phone: {
            type: String,
            required: true
        }
    }, 
    {timestamps: true} // Data que foi criado e a data da ultima atualização
    )
)

module.exports = User