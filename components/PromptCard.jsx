"use client"

import { useState } from "react";
import Image from 'next/image';
import { useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";

const PromptCard = ({ post, handleTagClick, handleEdit, handleDelete }) => {
  const { data: session } = useSession();
  const pathName = usePathname();
  const router = useRouter();

  const [copied, setCopied] = useState("");

  const handleCopy = () => {
    setCopied(post.prompt);
    navigator.clipboard.writeText(post.prompt);
    setTimeout(() => setCopied(""), 3000);
  }

  // Default image in case post.creator.image is undefined
  const defaultImage = '/assets/images/logo.svg'; // Replace with your default image path

  return (
    <div className="prompt_card">
      <div className="flex gap-5 justify-between items-start">
        <div className="flex flex-1 gap-3 justify-start items-center cursor-pointer">
          <Image 
            src={post.creator?.image || defaultImage}
            alt="user_image"
            width={40}
            height={40}
            className="object-contain rounded-full"
          />

          <div className="flex flex-col">
            {post.creator?._id ? (
              <Link href={`/profile/${post.creator._id}`}>
                <h3 className="font-semibold text-gray-900 capitalize font-satoshi">
                  {post.creator?.username || 'Unknown User'}  
                </h3>
                <p className="text-sm text-gray-500 font-inter">
                  {post.creator?.email || 'No email provided'}
                </p>
              </Link>
            ) : (
              <>
                <h3 className="font-semibold text-gray-900 capitalize font-satoshi">
                  Unknown User
                </h3>
                <p className="text-sm text-gray-500 font-inter">
                  No email provided
                </p>
              </>
            )}
          </div>
        </div>

        <div className="copy_btn" onClick={handleCopy}>
          <Image 
            src={copied === post.prompt ? '/assets/icons/tick.svg' : '/assets/icons/copy.svg'}
            width={12}
            height={12}
          />
        </div>
      </div>
      <p className="my-4 text-sm text-gray-700 font-satoshi">{post.prompt}</p>
      <p className="text-sm lowercase cursor-pointer font-inter blue_gradient" onClick={() => handleTagClick && handleTagClick(post.tag)}>
        #{post.tag}
      </p>
      {session?.user.id === post.creator?._id && pathName === '/profile' && (
        <div className="gap-4 pt-3 mt-5 border-t border-gray-100 flex-center">
          <p className="text-sm text-green-600 cursor-pointer font-inter" onClick={handleEdit}>
            Edit
          </p>
          <p className="text-sm text-red-600 cursor-pointer font-inter" onClick={handleDelete}>
            Delete
          </p>
        </div>
      )}
    </div>
  )
}

export default PromptCard