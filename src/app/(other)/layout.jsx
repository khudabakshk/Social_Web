import { Geist, Geist_Mono } from "next/font/google";
import "../globals.css";
import LeftSidebar from "../../components/LeftSidebar";
import RightSidebar from "../../components/RightSidebar";
import { ClerkLoaded, ClerkLoading, ClerkProvider } from "@clerk/nextjs";
import Loder from "../../components/Loder";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
  <ClerkProvider>
      <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ClerkLoading>
          <Loder/>
        </ClerkLoading>
          <ClerkLoaded>

       
      <div className="flex justify-between w-[90%] mx-auto "  >
          <div className="hidden sm:inline broder-r h-screen sticky top-0">
          <LeftSidebar/>
          </div>
          <div className="max-w-3xl flex-1">
          {children}

          </div>
          <div className="lg:flex-col p-3 h-screen broder-1 hidden lg:flex w-[24rem]">
          <RightSidebar />
          </div>

        </div> 

        </ClerkLoaded>

      </body>
    </html>
  </ClerkProvider>
  );
}