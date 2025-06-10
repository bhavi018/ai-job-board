const axios = require('axios');
const fs = require('fs');
const path = require('path');

exports.uploadResume = async (req, res) => {
  try {
    const filePath = req.file.path;

    // Send file to Python microservice
    const formData = new FormData();
    formData.append('resume', fs.createReadStream(filePath));

    const response = await axios.post('http://localhost:8000/parse-resume', formData, {
      headers: formData.getHeaders()
    });

    // Save parsed data (skills, education, etc.)
    const parsedData = response.data;
    // You can save parsedData to MongoDB linked to req.user.id

    res.status(200).json({ message: 'Resume parsed successfully', parsedData });
  } catch (err) {
    res.status(500).json({ message: 'Resume parsing failed', error: err.message });
  }
};
