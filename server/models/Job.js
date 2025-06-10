const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
  title: { type: String, required: true },
  company: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // company user id
  location: { type: String },
  description: { type: String },
  skillsRequired: [{ type: String }],
  salaryRange: { type: String }, // optional
  employmentType: { type: String, enum: ['Full-time', 'Part-time', 'Contract', 'Internship'] },
  postedAt: { type: Date, default: Date.now },
  deadline: { type: Date },
});

module.exports = mongoose.model('Job', jobSchema);
