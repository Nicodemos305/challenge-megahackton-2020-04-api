const Mongoose =  require('mongoose')
const sessionSchema = new Mongoose.Schema({
    token: {
        type: String,
        required: true
    },
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
module.exports = Mongoose.models.session || Mongoose.model('session', sessionSchema);