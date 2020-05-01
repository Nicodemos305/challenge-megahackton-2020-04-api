const Mongoose =  require('mongoose')
const spendingSchema = new Mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    kind: {
        type: String,
        required: true
    },
    value: {
        type: Number,
        required: true
    },
    payday: {
        type: Date,
        required: true
    },
    phone: {
        type: String,
        required: true,
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

module.exports = Mongoose.models.spending || Mongoose.model('spending', spendingSchema);