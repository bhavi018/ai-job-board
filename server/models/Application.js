const mongoose = require('mongoose');

const applicationSchema = new mongoose.Schema({
  job: { type: mongoose.Schema.Types.ObjectId, ref: 'Job', required: true },
  applicant: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  resume: { type: String }, // filepath or URL of uploaded resume
  appliedAt: { type: Date, default: Date.now },
  status: { type: String, enum: ['Pending', 'Reviewed', 'Rejected', 'Accepted'], default: 'Pending' },
});

module.exports = mongoose.model('Application', applicationSchema);
