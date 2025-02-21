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


// import POST from "../../../../lib/models/post.model.js";
// import { connect } from "../../../../lib/mongoose/connectDB.js";
// import { currentUser } from "@clerk/nextjs/server";

// export async function post(req) {
//     const user = await currentUser(req);
//     try {
//         await connect();
//         const data = await req.JSON();
//         console.log("Received Data:", data);
//         if (!user || user.publicMetadata.userMongoId !== data.userMongoId) {
//             return new Response("Unauthorized", { status: 401 });
//         }

//         const newPost = await POST.create({
//             user: data.userMongoId,
//             name: data.name,
//             username: data.username,
//             text: data.text,
//             profileImg: data.profileImg,
//             image: data.image,
//         });

//         await newPost.save();

//         return new Response(JSON.stringify(newPost), { status: 200 });
//     } catch (error) {
//         console.error("Error creating post:", error);
//         return new Response(JSON.stringify({ message: "Internal Server Error", error: error.message }), { status: 500 });
//     }

// }


import POST from "../../../../lib/models/post.model.js";
import { connect } from "../../../../lib/mongoose/connectDB.js";
import { currentUser } from "@clerk/nextjs/server";

export async function post(req) {
    const user = await currentUser(req);
    try {
        // Fixing the method to parse the JSON body of the request
        const data = await req.json(); // .json() instead of .JSON()
        console.log("Received Data:", data);

        // Authorization check: Ensure the user is authorized to create the post
        if (!user || user.publicMetadata.userMongoId !== data.userMongoId) {
            return new Response("Unauthorized", { status: 401 });
        }

        // Create the new post in the database
        const newPost = new POST({
            user: data.userMongoId,
            name: data.name,
            username: data.username,
            text: data.text,
            profileImg: data.profileImg,
            image: data.image,
        });

        // Save the post
        await newPost.save();

        // Respond with the newly created post
        return new Response(JSON.stringify(newPost), { status: 200 });
    } catch (error) {
        // Log error and return a server error response
        console.error("Error creating post:", error);
        return new Response(JSON.stringify({ message: "Internal Server Error", error: error.message }), { status: 500 });
    }
}
