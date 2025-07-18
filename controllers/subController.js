import { workFlowClient } from '../config/upstash.js';
import Subcsription from'../models/subModel.js';

const SERVER_URL = process.env.SERVER_URL ;

export const createSubscription = async (req,res,next) =>{
    try {
        const subscription = await Subcsription.create({...req.body,
            user : req.user._id,
        });
        const { workflowRunId } = await workFlowClient.trigger({
      url: `${SERVER_URL}/api/v1/workflows/subscription/reminder`,
      body: {
        subscriptionId: subscription._id,
      },
      headers: {
        'content-type': 'application/json',
      },
      retries: 0,
    })
        res.status(201).json({success:true,data:subscription ,workflowRunId});
    } catch (error) {
        next(error)
    }
};

export const getUserSubs = async(req,res,next) =>{
    try {
        //check if the user is same as in the token

        if(req.user.id != req.params.id){
            const error =  new Error('u aint the owner of the account');
            error.status = 401;
            throw error
        }

        const subscription = await Subcsription.find({user:req.params.id});
      if (!subscription) {
      const error = new Error("Subscription not found");
      error.statusCode = 404;
      throw error;
    }
        res.status(201).json({success:true,data:subscription});
    } catch (error) {
        next(error)
    }
}