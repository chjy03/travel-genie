const mongoose = require('mongoose');

const ReportSchema = new mongoose.Schema({
    issueText: {
        type: String,
        required: true
    },
    issueDate: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Report', ReportSchema);










