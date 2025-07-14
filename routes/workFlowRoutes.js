import { Router } from 'express';
import { sendReminders } from '../controllers/workFlowController.js';
const workFlowRouter = Router();

workFlowRouter.post('/subscription/newSub/reminder',sendReminders);

export default workFlowRouter;