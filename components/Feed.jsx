'use client';

import { useState, useEffect } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import PromptCard from './PromptCard';
import useSWR from 'swr';

const fetcher = async (...args) => {
  const res = await fetch(...args);
  if (!res.ok) {
    throw new Error(`An error occurred while fetching the data. Status: ${res.status}`);
  }
  const data = await res.json();
  if (!Array.isArray(data)) {
    console.error('Fetched data is not an array:', data);
    throw new Error('Fetched data is not in the expected format');
  }
  return data;
};

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
    refreshInterval: 5000,
    revalidateOnFocus: true,
    dedupingInterval: 1000,
    onError: (error) => {
      console.error('SWR Error:', error);
    }
  });

  const handleSearchChange = (e) => {
    setSearchText(e.target.value);
  }

  useEffect(() => {
    console.log('Posts data:', posts); // Log the posts data
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
    <section className="feed" data-sentry-component="Feed" data-sentry-source-file="Feed.jsx">
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
        <div className="mt-16 text-center text-red-500">
          Failed to load posts: {error.message}
        </div>
      ) : !Array.isArray(posts) ? (
        <div className="mt-16 text-center text-red-500">
          Invalid data format received from server
        </div>
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