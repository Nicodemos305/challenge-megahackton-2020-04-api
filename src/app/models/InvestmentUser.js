const Mongoose =  require('mongoose');

const investmenUsertSchema = new Mongoose.Schema({

    phone: {
        type: String,
        required: true
    },

    idInvestment: {
        type: String,
        required: true
    },
    value: {
        type: Number,
        required: true
    },
    insertedAt: {
        type: Date,
        default: new Date()
    },
    soldDate: {
        type: Date,
    },
    profit: {
        type: Number
    },
});

module.exports = Mongoose.models.InvestmentUser || Mongoose.model('InvestmentUser', investmenUsertSchema);