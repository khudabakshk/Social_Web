import { Webhook } from "svix";
import { headers } from "next/headers";
import { createOrUpdateUSer } from "../../../lib/action/user";

export async function POST (req) {
    // You can find this in the Clerk Dashboard -> Webhooks -> choose the endpoint
    const WEB_HOOK_KEY = process.env.WEBHOOK_SECRET_KEY
    if(!WEB_HOOK_KEY){
        throw new Error (`Please add WEBHOOK_KEY from Clerk Dashboard to .env or .env.local`)
    }

   // Get the headers

    const headerpayload = headers()
    const svix_id   =  headerpayload.get("svix_id")
    const svix_timestmap   =  headerpayload.get("svix_timestmap")
    const svix_signature   =  headerpayload.get("svix_signature")

       // If there are no headers, error out

    if (!svix_id || !svix_timestmap || !svix_signature){
        throw Error ("Invalid in svix_id , svix_timestmap ,svix_signature")
        
    }

   // Get the body
    
    const payload = await req.json()
    const body = JSON.stringify(payload)

  

 // Create a new Svix instance with your secret

  const wh  = new Webhook (WEB_HOOK_KEY)
  let evt;

  // Verify the payload with the headers
  try {
    evt = wh.verify(body,{
      'svix-id':svix_id,
      'svix-timestamp':svix_timestmap,
      'svix-signature':svix_signature,
    })
  } catch (error) {
    console.error(`Error verifying webhook:`,error)
      return new Response(`Error occured`,{
        status:400,
      })  
  }
  const {id} = evt?.data
  const eventype = evt?.data
  if(eventype === 'user create' || eventype === 'user update'){
    const {
      id,
      first_name,
      last_name,
      image_url,
      email_addresses,
      username
    } = evt.data
  }

  try {
    const user = await createOrUpdateUSer (id,{
      id,
      first_name,
      last_name,
      image_url,
      email_addresses,
      username
    })
  } catch (error) {
    
  }
  return new Response('', { status: 200 });

}