'use client';

import { useState, useEffect } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import PromptCard from './PromptCard';

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
        <Skeleton className="h-12 w-12 rounded-full" />
        <div className="space-y-2 flex-col">
          <Skeleton className="h-4 w-[150px]" />
          <Skeleton className="h-4 w-[250px]" />
        </div>
      </div>
    )
  }

const Feed = () => {
  const [searchText, setSearchText] = useState('');
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [loading, setLoading] = useState(true); // Add loading state

  const handleSearchChange = (e) => {
    setSearchText(e.target.value);
  }

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true); // Set loading to true while fetching
      try {
        const response = await fetch('/api/prompt');
        const data = await response.json();
        setPosts(data);
        setFilteredPosts(data);
      } catch (error) {
        console.error('Error fetching posts:', error);
      } finally {
        setLoading(false); // Set loading to false after fetching
      }
    }

    fetchPosts();
  }, []);

  useEffect(() => {
    const filterPosts = () => {
      const filtered = posts.filter(
        (post) =>
          post.tag.toLowerCase().includes(searchText.toLowerCase()) || 
          post.creator.username.toLowerCase().includes(searchText.toLowerCase()) ||
          post.prompt.toLowerCase().includes(searchText.toLowerCase())
      );
      setFilteredPosts(filtered);
    };

    filterPosts();
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

      {loading ? (
        // Render multiple SkelentonCards components to represent loading state
        <div className="mt-16 prompt_layout">
          {[...Array(6)].map((_, index) => (
            <SkeletonCards key={index} />
          ))}
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

export default Feed