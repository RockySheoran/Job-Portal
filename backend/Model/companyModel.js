import mongoose from "mongoose";

const companySchema = new mongoose.Schema ({
    name:{
        type:String,
        required:true,
        unique:true,
    },
    description:{
        type:String,
       
    },
    website:{
        type:String,
       
    },
    location:{
        type:String,
       
    },
    logo:{
        type:String, // utl to company logo
       
    },
    userId :{
    type:mongoose.Schema.Types.ObjectId,
    ref:"User",
    required:true
    }

},{timestamps:true})

export const companyModel = mongoose.model.Company || mongoose.model("Company",companySchema) 