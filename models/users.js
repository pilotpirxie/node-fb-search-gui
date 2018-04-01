const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const UserSchema = new Schema({
    socialID: {
        type: String,
        required: [true, 'Social ID is required'],
        trim: true
    },
    name: {
        type: String,
        required: [true, 'Login field is required'],
        trim: true
    },
    email: {
        type: String,
        required: false
    }
});

const User = mongoose.model('user', UserSchema);

module.exports = User;
