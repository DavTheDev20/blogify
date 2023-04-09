'use client';

import { redirect } from 'next/navigation';
import { useSession } from 'next-auth/react';
import Post from '../components/Post';
import axios from 'axios';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { PostType } from '@/types/types';
import Loading from '../components/Loading';

export default function Profile() {
  const { data: session, status } = useSession();
  const { data, error, isLoading } = useQuery({
    queryKey: ['authPosts'],
    queryFn: async () => {
      const response = await axios.get('http://localhost:3000/api/authPosts');
      const data = await response.data;
      const posts: Array<PostType> = data.posts;
      return posts;
    },
  });

  if (session) {
    return (
      <div className="w-1/3 m-auto">
        <h1 className="text-2xl text-center text-slate-800 mb-5">
          Welcome {session.user?.name}
        </h1>
        <h2 className="text-xl text-center text-slate-700">Your Posts</h2>
        {isLoading ? (
          <Loading />
        ) : (
          data?.map((post) => {
            return (
              <Post
                content={post.content}
                createdAt={post.createdAt}
                image={session.user?.image as string}
                name={session.user?.name as string}
                title={post.title}
              />
            );
          })
        )}
      </div>
    );
  }
}
