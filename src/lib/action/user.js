import User from "../models/user.model"
import {connectDB} from "../mongoose/connectDB"

export const createOrUpdateUSer = async(
    id,
    first_name,
    last_name,
    image_url,
    email_addresses,
    username
)=>{
    try {
        await connectDB();
        const user = User.findOneAndUpdate(
            {clerkID:id},{
                $set:{
                    email:email_addresses,
                    firstName:first_name,
                    lastName:last_name,
                    userName:username,
                    avator:image_url
                }
            },
            {new:true,upsert:true}
        )
        return user
    } catch (error) {
        console.log(`Error in CreateOrUpdateUser ${error}`)
    }
}
