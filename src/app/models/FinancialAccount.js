const Mongoose = require('mongoose');

const financialAccountSchema = new Mongoose.Schema({
    phone: {
        type: String,
        required: true
    },
    balance: {
        type: Number,
        required: true
    },
    extract: {
        type: Number
    },
    insertedAt: {
        type: Date,
        default: new Date()
    },
    updatedAt: {
        type: Date,
        default: new Date()
    }
});

module.exports = Mongoose.models.financialAccount || Mongoose.model('financialAccount', financialAccountSchema);