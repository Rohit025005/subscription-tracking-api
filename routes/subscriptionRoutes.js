
import { Router } from'express';
import { authorize } from '../middlewares/authMiddleware.js';
import { createSubscription, getUserSubs } from '../controllers/subController.js';
import Subcsription from '../models/subModel.js';

const subRouter = Router();


//get all subscriptions
subRouter.get('/', async (req, res, next) => {
    try {
        const subscriptions = await Subcsription.find();
        res.status(200).json({ success: true, data: subscriptions });
    } catch (error) {
        next(error);
    }
});

//get a users  subscription by id
subRouter.get('/:id',authorize,getUserSubs);

//create  a new  subscription by id
subRouter.post('/',authorize,createSubscription);


export default subRouter;