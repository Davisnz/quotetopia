"use client";

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

import { SkeletonCards } from '@components/Feed';

import Profile from '@components/Profile';

const MyProfile = () => {
  const router = useRouter();
  const { data : session } = useSession();
  const [posts, setPosts] = useState([]);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [postToDelete, setPostToDelete] = useState(null);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      try {
        const response = await fetch(`/api/users/${session?.user.id}/posts`);
        const data = await response.json();
        setPosts(data);
      } catch (error) {
        console.error('Error fetching posts:', error);
      } finally {
        setLoading(false);
      }
    }

    if(session?.user.id) fetchPosts();
  }, []);

  const handleEdit = (post) => {
    router.push(`/update-prompt?id=${post._id}`)
  }

  const handleDelete = (post) => {
    setPostToDelete(post);
    setIsDeleteDialogOpen(true);
  };

  const confirmDelete = async () => {
    if (postToDelete) {
      try {
        const response = await fetch(`/api/prompt/${postToDelete._id.toString()}`, {
          method: 'DELETE'
        });

        if (response.ok) {
          const filteredPosts = posts.filter((p) => p._id !== postToDelete._id);
          setPosts(filteredPosts);
        }
      } catch (error) {
        console.error('Error deleting post:', error);
      }
    }
    setIsDeleteDialogOpen(false);
    setPostToDelete(null);
  };

  const cancelDelete = () => {
    setIsDeleteDialogOpen(false);
    setPostToDelete(null);
  };

  return (
    <>
      {loading ? (
        <div className="flex flex-row gap-6 p-8">
          <SkeletonCards />
          <SkeletonCards />
          <SkeletonCards />
        </div>
      ) : (
      <Profile
        name="My"
        desc="Welcome to your profile. Below you will find all the quotes you have created."
        data={posts}
          handleEdit={handleEdit}
          handleDelete={handleDelete}
        />
      )}
  
      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>✋ Are you sure you want to delete this quote?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your quote.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={cancelDelete}>Cancel</AlertDialogCancel>
            <AlertDialogAction className="bg-red-500 hover:bg-red-600" onClick={confirmDelete}>Delete</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}

export default MyProfile