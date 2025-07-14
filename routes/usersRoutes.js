
import { Router } from'express';
import { getUser, getUsers } from '../controllers/userController.js';
import { authorize } from '../middlewares/authMiddleware.js';
import User from '../models/userModel.js';

const userRouter = Router();


//get all users
userRouter.get('/',getUsers);

//get a user by id
userRouter.get('/:id',authorize,getUser);

//create new user
userRouter.post('/', async (req, res, next) => {
    try {
        const user = await User.create(req.body);
        res.status(201).json({ success: true, data: user });
    } catch (error) {
        next(error);
    }
});

//update a user
userRouter.put('/:id', async (req, res, next) => {
    try {
        const user = await User.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });
        if (!user) {
            const error = new Error('User not found');
            error.statusCode = 404;
            throw error;
        }
        res.status(200).json({ success: true, data: user });
    } catch (error) {
        next(error);
    }
});

//delete a user
userRouter.delete('/:id', async (req, res, next) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        if (!user) {
            const error = new Error('User not found');
            error.statusCode = 404;
            throw error;
        }
        res.status(200).json({ success: true, data: {} });
    } catch (error) {
        next(error);
    }
});

export default userRouter;