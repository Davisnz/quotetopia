'use client';

import { useState, useEffect } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import PromptCard from './PromptCard';
import useSWR from 'swr';

const fetcher = (...args) => fetch(...args).then(res => res.json());

const PromptCardList = ({ data, handleTagClick }) => {
  return (
    <div className="mt-16 prompt_layout">
      {data.map((post) => (
        <PromptCard 
          key={post._id}
          post={post}
          handleTagClick={handleTagClick}
        />
      ))}
    </div>
  )
}

export function SkeletonCards() {
  return (
    <div className="flex items-center space-x-4 border-[1px] border-gray-200 p-6 rounded-lg shadow-sm">
      <Skeleton className="w-12 h-12 rounded-full" />
      <div className="flex-col space-y-2">
        <Skeleton className="h-4 w-[150px]" />
        <Skeleton className="h-4 w-[250px]" />
      </div>
    </div>
  )
}

const Feed = () => {
  const [searchText, setSearchText] = useState('');
  const [filteredPosts, setFilteredPosts] = useState([]);

  const { data: posts, error, isLoading } = useSWR('/api/prompt', fetcher, {
    refreshInterval: 5000, // Refresh every 5 seconds
    revalidateOnFocus: true,
    dedupingInterval: 1000,
  });

  const handleSearchChange = (e) => {
    setSearchText(e.target.value);
  }

  useEffect(() => {
    if (posts && Array.isArray(posts)) {
      const filtered = posts.filter(post => 
        post.tag?.toLowerCase().includes(searchText.toLowerCase()) || 
        post.creator?.username?.toLowerCase().includes(searchText.toLowerCase()) ||
        post.prompt?.toLowerCase().includes(searchText.toLowerCase())
      );
      setFilteredPosts(filtered);
    } else {
      console.error('Posts is not an array or is undefined:', posts);
      setFilteredPosts([]);
    }
  }, [searchText, posts]);

  return (
    
    <section className="feed">
      <form className="relative w-full flex-center">
        <input 
          type="text"
          placeholder="Search a quote, word, tag or username."
          value={searchText}
          onChange={handleSearchChange}
          required
          className="search_input peer"
        />
      </form>

      {isLoading ? (
        <div className="mt-16 prompt_layout">
          {[...Array(6)].map((_, index) => (
            <SkeletonCards key={index} />
          ))}
        </div>
      ) : error ? (
        <div className="mt-16 text-center text-red-500">Failed to load posts</div>
      ) : (
        <PromptCardList 
          data={filteredPosts}
          handleTagClick={(tag) => {
            setSearchText(tag);
          }}
        />
      )}
    </section>
  )
}

export default Feed;