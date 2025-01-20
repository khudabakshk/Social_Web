import { Webhook } from 'svix';
import { headers } from 'next/headers';
import { clerkClient } from '@clerk/nextjs/server';
import { CreateOrUpdateUSer } from '@/lib/action/user';

export async function POST(req) {
  // Ensure WEBHOOK_SECRET is defined
  const WEBHOOK_SECRET = process.env.WEBHOOK_SECRET_KEY;

  if (!WEBHOOK_SECRET) {
    console.error('WEBHOOK_SECRET is missing. Please define it in your environment variables.');
    return new Response('Internal Server Error', { status: 500 });
  }

  try {
    // Get headers from the request
    const headerPayload = headers();
    const svix_id = headerPayload.get('svix-id');
    const svix_timestamp = headerPayload.get('svix-timestamp');
    const svix_signature = headerPayload.get('svix-signature');

    // Validate required headers
    if (!svix_id || !svix_timestamp || !svix_signature) {
      console.error('Missing required Svix headers');
      return new Response('Bad Request: Missing required Svix headers', {
        status: 400,
      });
    }

    // Parse the request body
    const payload = await req.json();
    const body = JSON.stringify(payload);

    // Verify the webhook payload
    const wh = new Webhook(WEBHOOK_SECRET);
    const evt = wh.verify(body, {
      'svix-id': svix_id,
      'svix-timestamp': svix_timestamp,
      'svix-signature': svix_signature,
    });

    // Extract event details
    const { id } = evt?.data || {};
    const eventType = evt?.type;

    console.log(`Webhook received. ID: ${id}, Type: ${eventType}`);
    console.log('Webhook body:', payload);

    // Handle specific event types
    if (eventType === 'user.created' || eventType === 'user.updated') {
      const {
        id,
        first_name,
        last_name,
        image_url,
        email_addresses,
        username,
      } = evt?.data || {};

      if (!id || !email_addresses) {
        console.error('Missing required user data in event payload');
        return new Response('Bad Request: Missing required user data', {
          status: 400,
        });
      }

      try {
        const user = await CreateOrUpdateUSer(
          id,
          first_name,
          last_name,
          image_url,
          email_addresses,
          username
        );

        if (user && eventType === 'user.created') {
          try {
            await clerkClient.users.updateUserMetadata(id, {
              publicMetadata: {
                userMongoId: user._id,
              },
            });
            console.log('User metadata updated successfully');
          } catch (error) {
            console.error('Error updating user metadata:', error);
          }
        }
      } catch (error) {
        console.error('Error creating or updating user:', error);
        return new Response('Error occurred during user processing', {
          status: 500,
        });
      }
    }

    return new Response('Webhook processed successfully', { status: 200 });
  } catch (error) {
    console.error('Error processing webhook:', error);
    return new Response('Internal Server Error', {
      status: 500,
    });
  }
}
