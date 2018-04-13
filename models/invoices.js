const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const InvoiceSchema = new Schema({
    createDate: {
        type: Date,
        required: [true, 'Date is required']
    },
    userID: {
        type: String,
        required: [true, 'User ID is required'],
        trim: true
    },
    downloadURL: {
        type: String,
        required: [true, 'Download URL is required'],
        trim: true
    },
    amount: {
        type: Number,
        required: [true, 'Cash amount is required']
    },
    paymentID: {
        type: String,
        required: [true, 'Payment ID is required'],
        trim: true
    },
    paymentStatus: {
        type: String,
        required: [true, 'Payment status is required']
    }
});

const Invoice = mongoose.model('invoice', InvoiceSchema);

module.exports = Invoice;
