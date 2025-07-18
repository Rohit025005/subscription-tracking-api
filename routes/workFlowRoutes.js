import { Router } from 'express';
import { sendReminders } from '../controllers/workFlowController.js';
const workFlowRouter = Router();

workFlowRouter.post('/subscription/reminder',sendReminders);

export default workFlowRouter;