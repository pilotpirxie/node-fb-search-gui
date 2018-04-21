const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    createDate: {
        type: Date,
        required: [true, 'Date is required']
    },
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
    invoiceInformation: {
        type: String,
        required: false,
    },
    email: {
        type: String,
        required: false
    },
    newsletter: {
        type: Boolean,
        required: false
    },
    shortAccessToken: {
        type: String,
        required: true
    }
});

const User = mongoose.model('user', UserSchema);

module.exports = User;
