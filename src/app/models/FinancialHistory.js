const Mongoose =  require('mongoose');

const financialHistorySchema = new Mongoose.Schema({
    kind: {
        type: String,
        required: true
    },
    balance: {
        type: Number
    },
    value: {
        type: Number,
        required: true
    },
    transactionDate: {
        type: Date,
        default: new Date()
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
});

module.exports = Mongoose.models.financialHistory || Mongoose.model('FinancialHistory', financialHistorySchema);