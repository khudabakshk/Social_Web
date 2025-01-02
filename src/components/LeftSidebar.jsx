import React from 'react'
import {
  ClerkProvider,
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton
} from '@clerk/nextjs'
export default function LeftSidebar() {
  return (
    <>
     <ClerkProvider>
      <SignedOut>
            <SignInButton />
          </SignedOut>
          <SignedIn>
            <UserButton />
          </SignedIn>
     </ClerkProvider>
    </>
  )
}
