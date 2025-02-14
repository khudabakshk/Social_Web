"use client"
import React, { useRef, useState } from 'react';
import { FaImage } from "react-icons/fa";
import { useUser } from '@clerk/nextjs';
import { IoMdClose } from "react-icons/io";
import { CldUploadWidget } from 'next-cloudinary';

export default function Input() {
  const { user, isSignedIn, isLoaded } = useUser();
  const IMAGEFILEREF = useRef(null);
  const [selectedImage, setSelectedImage] = useState(null);

  if (!user || !isSignedIn || !isLoaded) {
    return null;
  }

  const handleUploadImage = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(URL.createObjectURL(file));
    }
  };

  return (
    <div className="flex flex-col p-4 border rounded-lg shadow-lg bg-white w-full max-w-md space-y-4 m-auto">
      <textarea
        rows={2}
        className="w-full p-2 border rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-indigo-500"
        placeholder="Write your post...."
      />

      {
        selectedImage && (
          <div className="flex justify-end ">
          <IoMdClose
          size={20}
          className="cursor-pointer hover:scale-110"
            onClick={()=>{
                setSelectedImage(null)
              }} />
          </div>
        )
      }

      {selectedImage && (
        <div className="relative">
          <img src={selectedImage} alt="Uploaded" className="w-full rounded-lg shadow-md" />
        </div>
      )}

      <div className="flex items-center justify-between">
        {/* <div>
          <FaImage
            size={24}
            color="red"
            onClick={() => IMAGEFILEREF.current.click()}
            className="cursor-pointer hover:scale-110"
          />
          <input
            hidden
            type="file"
            accept="image/*"
            ref={IMAGEFILEREF}
            onChange={handleUploadImage}
          />
        </div> */}

        <CldUploadWidget uploadPreset="socialweb1">
    {({ open }) => {
    return (
      <button
      className="px-4 py-2 bg-[#0D9AFF] text-white rounded-md hover:bg-[#3c8fca]"
       onClick={() => open()}>
        Upload an Image
      </button>
    );
  }}
    </CldUploadWidget>

        <button className="px-4 py-2 bg-indigo-500 text-white rounded-md hover:bg-indigo-600">
          Post
        </button>
      </div>
    </div>
  );
}
