// In your backend routes (e.g., routes/analytics.js)
import express from 'express';
import Participant from '../models/Participant.js'; // Your participant model

const router = express.Router();

router.get('/analytics', async (req, res) => {
  try {
    const participants = await Participant.find();
    
    // Calculate basic stats
    const totalParticipants = participants.length;
    
    // Participants by league
    const participantsByLeague = participants.reduce((acc, p) => {
      acc[p.league] = (acc[p.league] || 0) + 1;
      return acc;
    }, {});
    
    // College distribution
    const collegeDistribution = participants.reduce((acc, p) => {
      acc[p.college] = (acc[p.college] || 0) + 1;
      return acc;
    }, {});
    
    // Average scores (filter out nulls)
    const scores = participants.filter(p => p.quizScore !== null).map(p => p.quizScore);
    const averageScore = scores.length ? scores.reduce((a, b) => a + b, 0) / scores.length : 0;
    
    // Submission times (filter out nulls)
    const submissionTimes = participants.filter(p => p.timeToSolveMCQ !== null).map(p => p.timeToSolveMCQ);
    
    // Daily registrations
    const dailyRegistrations = participants.reduce((acc, p) => {
      const date = new Date(p.createdAt).toISOString().split('T')[0];
      acc[date] = (acc[date] || 0) + 1;
      return acc;
    }, {});
    
    // Convert to array for chart
    const dailyRegistrationsArray = Object.entries(dailyRegistrations)
      .map(([date, count]) => ({ date, count }))
      .sort((a, b) => new Date(a.date) - new Date(b.date));
    
    res.json({
      totalParticipants,
      participantsByLeague,
      averageScore,
      submissionTimes,
      collegeDistribution,
      dailyRegistrations: dailyRegistrationsArray
    });
    
  } catch (error) {
    console.error('Analytics error:', error);
    res.status(500).send('Error generating analytics');
  }
});

export default router;