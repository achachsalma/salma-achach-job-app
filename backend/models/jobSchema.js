import mongoose from "mongoose";
const jobschema=new mongoose.Schema({
    title:{
        type:String,
        required:[true,"please provide job title"],
        minlength:[3,"job title must contain at least 3 characters"],
        maxlength: [50,"job title cannot exceed 50 characters"],
    },
    description:{
        type:String,
        required:[true,"please provide job description"],
        minlength:[50,"job description must contain at least 50 characters"],
        maxlength: [350,"job description cannot exceed 350 characters"],
    },
    category:{
        type:String,
        required:[true,"job category is required"],
    },
      country:{
        type:String,
        required:[true,"job country is required"],
    },
      city:{
        type:String,
        required:[true,"job city is required"],
    },
      location:{
        type:String,
        required:[true,"Please provide exact location!!"],
        minlength:[50,"job location must contain at least 50 characters"],

    },
    fixedSalary:{
        type:Number,
        minlength:[4,"fixed salary must contain at least 4 digits"],
        maxlength:[9,"fixed salary cannot exceed 9 digits"],
    },
    salaryFrom:{
        type:Number,
        minlength:[4,"salary From must contain at least 4 digits"],
        maxlength:[9,"salary From cannot exceed 9 digits"],
    },
        salaryTo:{
        type:Number,
        minlength:[4,"salary To must contain at least 4 digits"],
        maxlength:[9,"salary To cannot exceed 9 digits"],
    },
    expired:{
        type:Boolean,
        default:false
    },
    jobPostedOn:{
        type:Date,
        default:Date.now,
    },
    postedBy:{
        type:mongoose.Schema.ObjectId,
         ref:"User",
         required:true,
    },
});
export const Job =mongoose.model("Job",jobschema);