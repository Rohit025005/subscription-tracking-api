import mongoose from 'mongoose';
import dayjs from "dayjs";


export const subSchema = new mongoose.Schema({
    name:{
        type:String,
        unique:true,
        required:true,
        minLength : 2,
        maxLength : 100
    },
    price:{
        type:Number,
        required:true,
        min:0
    },
    currency:{
        type:String,
        enum:['INR','USD','EUR','GBP'],
        default:'INR',
        required:true
        
    },
    category:{
        type:String,
        enum:['sports','news','entertainment','tech','music','other'],
        required:true
    },
    frequency: {
        type: String,
        enum: ['daily', 'weekly', 'monthly', 'yearly']
        
    },
    status:{
        type:String,
        enum:['active','cancelled','expired'],
        default:'active',
            
        },
         startDate:{
        type:Date,
        // Using a proper validator object
        validate: {
            validator: function(value){
                
                return value <= new Date();
            },
            message: 'Start date cannot be in the future.'
        },
        required: true 
    },
            renewalDate:{
        type:Date,
        
        validate: {
            validator: function (value) {
             
                return this.startDate && value > this.startDate;
            },
            message:'Renewal date must be after the start date.'
        },
      
        },user:{
            type:mongoose.Schema.Types.ObjectId,
            ref:'User',
            required:true,
            index:true,
        }
});


subSchema.pre('save', function(next){
  
    if (!this.renewalDate || this.isModified('startDate') || this.isModified('frequency')) {
        if (!this.startDate || !this.frequency) {
            return next(new Error('startDate and frequency are required for renewalDate calculation.'));
        }

        let nextRenewal;
        const startDayjs = dayjs(this.startDate);

        switch(this.frequency) {
            case 'daily':
                nextRenewal = startDayjs.add(1, 'day');
                break;
            case 'weekly':
                nextRenewal = startDayjs.add(1, 'week');
                break;
            case 'monthly':
                nextRenewal = startDayjs.add(1, 'month');
                break;
            case 'yearly':
                nextRenewal = startDayjs.add(1, 'year');
                break;
            default:
                return next(new Error('Invalid frequency for renewal date calculation.'));
        }
        this.renewalDate = nextRenewal.toDate();
    }
    if(this.renewalDate < new Date() && this.status !== 'cancelled') { 
        this.status = 'expired';
    }
    next();
});

const Subcsription = mongoose.model('Subcsription',subSchema);

export default Subcsription;