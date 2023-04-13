const mongoose = require('mongoose');

const DataSchema = mongoose.Schema(
    {
        email: {
            type: String,
            unique: true,
            required: true
        },
        firstName: {type: String},
        lastName: {type: String},
        mobile: {type: String},
        password: {
            type: String,
            required: true
        },
        photo: {type: String},
    },{
        versionKey:false,
        timestamps: true
    }
);

const UsersModel = mongoose.model("users", DataSchema);

module.exports = UsersModel;