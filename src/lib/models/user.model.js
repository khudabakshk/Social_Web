import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    clerkID:{
        type:String,
        required:true,
        unique:true
    },
    email:{
        type:string,
    },
    firstName:{
        type:String,
        required:true
    },
    lastName:{
        type:String,
        required:true
    },
    userName:{
        type:String,
        required:true,
        unique:true
    },
    avator:{
        type:String,
        required:true,
    },
    followers:{
        type:[{type: Schema.Types.ObjectId, ref: 'User'} ] ,
        default:true
    },
    following:{
        type:[{type: Schema.Types.ObjectId, ref: 'User'} ] ,
        default:true

    }
})

const User = mongoose.models.User || mongoose.model("User", userSchema);
export default User;

