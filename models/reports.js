const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ReportSchema = new Schema({
    createDate: {
        type: Date,
        required: [true, 'Date is required']
    },
    keywords: {
        type: String,
        required: [true, 'Keywords are required'],
        trim: true
    },
    coordinates: {
        type: String,
        required: [true, 'Long and Lat coordinates are required'],
        trim: true
    },
    params: {
        type: String,
        required: false
    },
    quotaLimit: {
        type: Number,
        required: true
    }
});

const Report = mongoose.model('report', ReportSchema);

module.exports = Report;
