'use client';

import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { log } from 'console';
import Post from './components/Post';
import Loading from './components/Loading';

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
      <form className="bg-slate-300 w-5/12 m-auto mt-10 h-69 rounded-md">
        <div className="p-8">
          <input
            name="title"
            className="block my-2 w-11/12 p-1 rounded-sm"
            type="text"
            placeholder="What's your title?"
            autoComplete="off"
          />
          {/* <label>Say whats on your mind!</label> */}
          <textarea
            name="content"
            className="block my-3 w-11/12 h-32 p-1 rounded-sm"
            placeholder="say whats on your mind... 🤔"
          />
          <input
            className="mt-2 bg-blue-500 px-6 py-1 text-white rounded-md cursor-pointer"
            type="submit"
            value="Post"
          />
        </div>
      </form>
      <div className="w-5/12 m-auto mt-10">
        {isLoading ? (
          <Loading />
        ) : isError ? (
          'Error...'
        ) : (
          data.map((post: any) => {
            return (
              <Post
                title={post.title}
                content={post.content}
                createdAt={post.createdAt}
              />
            );
          })
        )}
      </div>
    </div>
  );
}
