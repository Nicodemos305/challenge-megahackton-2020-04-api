const Mongoose =  require('mongoose');

const investmentSchema = new Mongoose.Schema({

    name: {
        type: String,
        required: true
    },

    yield: {
        type: Number,
        required: true
    },
});

module.exports = Mongoose.models.investment || Mongoose.model('Investment', investmentSchema);