// controllers/recommendationController.js
const { getRecommendations } = require('../services/recommendationService');

const getJobRecommendations = async (req, res) => {
  try {
    const userId = req.user.id;
    const recommendations = await getRecommendations(userId);
    res.status(200).json({ success: true, data: recommendations });
  } catch (error) {
    console.error('Recommendation Error:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch recommendations' });
  }
};

module.exports = { getJobRecommendations };
