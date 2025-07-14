import { createRequire } from "module";
const require = createRequire(import.meta.url);
import Subcsription from "../models/subModel.js";
import dayjs  from "dayjs";
const  { serve } = require('@upstash/workflow/express');

const reminders = [7,5,2,1]
export const sendReminders = serve(async (context) => {
    const {subscriptionId} = context.requestPayload;
    const subscription = await fetchSubscription(context,subscriptionId);

    if(!subscription || subscription.status != 'active') return;

    const renewalDate =  dayjs(subscription.renewalDate);

    if(renewalDate.isBefore(dayjs())){
        console.log(`Renewal date has passed for subscription ${subscriptionId}.stopping workflow`);
        return;
    }
    for(const dayBefore of reminders){
        const reminderDate = renewalDate.substract(dayBefore,'day') ;

        if (reminderDate.isAfter(dayjs())) {
            await sleepUntilReminder(context ,`Reminder ${dayBefore} days before`,reminderDate)
        }

        await triggeringReminder(context ,`Reminder ${dayBefore} days before`);
    }
});

const fetchSubscription = async(context,subscriptionId)=>{
    return await context.run('get subscription',()=>{
        return Subcsription.findById(subscriptionId).populate('user','name email');
    });
}


const sleepUntilReminder = async (context,label,date) => {
    console.log(`slleping until ${label} , reminder at${date}`);
    await context.sleepUntil(label,date.toDate());
}

const triggeringReminder = async (context,label) => {
    return await context.run(label,()=>{
        console.log(`Triggering ${label} reminder`);
    })
}