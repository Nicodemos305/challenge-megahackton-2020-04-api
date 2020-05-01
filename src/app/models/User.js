const Mongoose =  require('mongoose');

const userSchema = new Mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true,
        unique: true 
      },
    maritalStatus: String,
    dateOfbirth: Date,
    country: String,
    state: String,
    city: String,
    salary: Number,
    insertedAt: {
        type: Date,
        default: new Date()
    },
    updatedAt: {
        type: Date,
        default: new Date()
    }
})

// mocha workaround
module.exports = Mongoose.models.user || Mongoose.model('user', userSchema)