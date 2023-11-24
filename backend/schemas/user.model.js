const mongoose = require('mongoose');

const Schema = mongoose.Schema

const UsersSchema = new Schema(
    { 
        name: {
            type: String,
            required: [true, 'Name field is required'],
        },
        age: { 
            type: Number, 
            min: 0,
            required: [true, 'Age field is required'],
        }, 
        email: {
            type: String,
            required: [true, 'Email field is required'],
            validate: {
                validator: function(v) {
                    return /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/.test(v);
                },
                message: props => `${props.value} is not a valid email address!`
            }
        }, 
        contact: { 
            type: Number,
            required: [true, 'Contact field is required'],
        } 
    },
    { 
        timestamps: true 
    }
)

const Users = mongoose.model('Users', UsersSchema)

module.exports = Users