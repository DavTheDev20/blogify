'use client';

import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { log } from 'console';
import Post from './components/Post';

export default function Home() {
  const { isLoading, isError, data, error } = useQuery({
    queryKey: ['posts'],
    queryFn: async () => {
      const response = await axios.get('http://localhost:3000/api/posts');
      const data = await response.data;
      const posts = data.posts;
      return posts;
    },
  });

  return (
    <div>
      <form className="bg-slate-300 w-5/12 m-auto mt-10 h-80 rounded-md">
        <div className="p-10">
          <label>What are you telling us?</label>
          <input
            name="title"
            className="block my-2 w-4/5 p-1"
            type="text"
            placeholder="enter a title..."
            autoComplete="off"
          />
          <label>Say whats on your mind!</label>
          <textarea
            name="content"
            className="block my-2 w-4/5 h-28 p-1"
            placeholder="type your thoughts... 🤔"
          />
          <input
            className="mt-2 bg-blue-500 px-6 py-1 mb-1 text-white rounded-md cursor-pointer"
            type="submit"
            value="Post"
          />
        </div>
      </form>
      <div className="w-5/12 m-auto mt-10">
        {isLoading
          ? 'Loading...'
          : isError
          ? 'Error...'
          : data.map((post: any) => {
              return <Post title={post.title} content={post.content} />;
            })}
      </div>
    </div>
  );
}
