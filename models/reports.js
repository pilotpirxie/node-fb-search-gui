const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ReportSchema = new Schema({
    userID: {
        type: String,
        required: [true, 'User ID is required']
    },
    createDate: {
        type: Date,
        required: [true, 'Date is required']
    },
    keywords: {
        type: String,
        required: [true, 'Keywords are required'],
        trim: true
    },
    status: {
        type: Boolean,
        required: [true, 'Crawler status'],
        trim: true
    },
    params: {
        type: Object,
        required: true
    },
    quotaLimit: {
        type: Number,
        required: true
    }
});

const Report = mongoose.model('report', ReportSchema);

module.exports = Report;
