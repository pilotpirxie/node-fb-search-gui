const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PageSchema = new Schema({
    createDate: {
        type: Date,
        required: [true, 'Date is required']
    },
    reportID: {
        type: String,
        required: [true, "Report ID is required"]
    },
    pageID: {
        type: String,
        required: [true, 'Page ID is required'],
        trim: true
    },
    name: {
        type: String,
        required: [true, 'Page name is required'],
        trim: true
    },
    category: {
        type: String,
        required: false
    },
    fanCount: {
        type: Number,
        required: [true, 'Fan count is required'],
    },
    talkingAbout: {
        type: Number,
        required: [true, 'Talkin about count is required'],
    },
    checkins: {
        type: Number,
        required: false
    },
    cover: {
        type: String,
        required: false
    },
    description: {
        type: String,
        required: false
    },
    website: {
        type: String,
        required: false
    }
});

const Page = mongoose.model('page', PageSchema);

module.exports = Page;
