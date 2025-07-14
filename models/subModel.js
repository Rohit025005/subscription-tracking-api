import mongoose from 'mongoose';



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
        unique:true,
        min:0
    },
    currency:{
        type:String,
        enum:['INR','USD','EUR','GBP'],
        default:'INR',
        required:true
        
    },
    catagory:{
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
            validate:function(value){ value <= new Date()},
            message:'start date must be in the past'
        },
        renewalDate:{
            type:Date,
            validate:function (value) {value > this.startDate},
            message:'start date must be after start date'
        },user:{
            type:mongoose.Schema.Types.ObjectId,
            ref:'User',
            required:true,
            index:true,
        }
});

//auto calculates the renewwal date before saving
subSchema.pre('save',function(next){
    if(!this.renewalDate){
        const renewalPeriod={
            daily:1,
            weekly:7,
            monthly:30,
            yearly:365
        };

        this.renewalDate = new Date(this.startDate);
        this.renewalDate.setDate(this.renewalDate.getDate() + renewalPeriod[this.frequency])
    }

    //auto update 
    if(this.renewalDate < new Date()){
        this.status = 'expired'
    }
    next();
});

const Subcsription = mongoose.model('Subcsription',subSchema);

export default Subcsription;