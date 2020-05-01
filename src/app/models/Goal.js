const Mongoose =  require('mongoose');

const goalSchema = new Mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    value: {
        type: Number,
        required: true
    },
    expectedDate: {
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
});

module.exports = Mongoose.models.goal || Mongoose.model('goal', goalSchema);