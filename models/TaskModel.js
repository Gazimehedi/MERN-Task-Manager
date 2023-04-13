const mongoose = require('mongoose');
const DataSchema = mongoose.Schema(
    {
        title: {type: String},
        description: {type: String},
        status: {type: String},
        email: {type: String},
    },
    {
        versionKey:false,
        timestamps: true
    }
);
const Tasks =  mongoose.model('tasks', DataSchema);
module.exports = Tasks;