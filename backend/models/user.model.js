import mongoose from "mongoose"

const userSchema = new mongoose.Schema({

    fullName: {
        type:String,
        required: true,
    },
    email:{
        type:String,
        required:true,
        unique:true 
    },
    phoneNumber:{
        type: Number,
        required:true
    },
    password:{
        type:String,
        required:true,
        unique:true
    },
    role:{
        type: String,
        enum :[ "Job Seeker", "Recruiter"],
        required:true 
    },
    profile:{
        bio:{
            type:String
        },
        skills:[ {type:String}],
        resume:{type:String},
        resumeOriginalName:{ type:String},
        company:{
            type:mongoose.Types.ObjectId,
            ref:"Company"
        },
        profilePhoto:{
            type:String,
            default:""
        }
    }


},
{
    timestamps:true,
}
) 


export const User = mongoose.model("User", userSchema)


