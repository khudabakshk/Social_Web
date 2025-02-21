// import POST from "../../../../lib/models/post.model";
// import { connect } from "../../../../lib/mongoose/connectDB"
// import { currentUser } from "@clerk/nextjs/server"

// export async function Post(req) {
//     const user = await currentUser(req)
//     try {
//         await connect()
//         const data = await req.json()
//         console.log("All data form post ====>"+ data)
//         if (!user || user.publicMetadata.userMongoId !== data.userMongoId) {
//             return new Response ("unauthorized", {
//                 status:401
//             })
//         }
//         const newPost = await POST.create({
//             user:data.userMongoId,
//             name:data.name,
//             username:data.username,
//             text:data.text,
//             profileImg:data.profileImg,
//             image:data.image
//         })

//         await newPost.save()
//         return new Response (json.stringify(newPost)

//     )

//     } catch (error) {
//             console.log(error)
//             return new Response (error.message)

//     }
// }


import POST from "../../../../lib/models/post.model.js";
import { connect } from "../../../../lib/mongoose/connectDB.js";
import { currentUser } from "@clerk/nextjs/server";

export async function post(req) {
    const user = await currentUser(req);
    try {
        await connect();
        const data = await req.JSON();
        console.log("Received Data:", data);
        if (!user || user.publicMetadata.userMongoId !== data.userMongoId) {
            return new Response("Unauthorized", { status: 401 });
        }

        const newPost = await POST.create({
            user: data.userMongoId,
            name: data.name,
            username: data.username,
            text: data.text,
            profileImg: data.profileImg,
            image: data.image,
        });

        await newPost.save();

        return new Response(JSON.stringify(newPost), { status: 200 });
    } catch (error) {
        console.error("Error creating post:", error);
        return new Response(JSON.stringify({ message: "Internal Server Error", error: error.message }), { status: 500 });
    }

}