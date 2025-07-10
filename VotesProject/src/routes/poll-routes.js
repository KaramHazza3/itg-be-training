import express from 'express'
import { renderDashboard, renderSubmitPoll, submitPoll,
     renderPollResults, renderPollVote, submitPollVote } from '../controllers/poll-controller.js';

const router = express.Router();

router.get('/', renderDashboard);
router.post('/polls/create', submitPoll);
router.get('/polls/create', renderSubmitPoll);
router.get('/polls/:id', renderPollResults);
router.get('/polls/:id/vote', renderPollVote);
router.post('/polls/:id/vote', submitPollVote);

export default router;