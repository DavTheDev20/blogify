'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import Post from './components/Post';
import Loading from './components/Loading';
import { FormEvent, useState, useRef } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { PostType } from '@/types/types';

export default function Home() {
  const API_ROUTE = 'http://localhost:3000/api/posts';
  const maxCharLength = 400;

  const queryClient = useQueryClient();

  const [contentCharCount, setContentCharCount] = useState(0);
  // @ts-ignore
  const titleInput: { current: HTMLInputElement } = useRef(null);
  // @ts-ignore
  const contentInput: { current: HTMLTextAreaElement } = useRef(null);

  async function getPosts() {
    const response = await axios.get(API_ROUTE);
    const data = await response.data;
    let posts: Array<PostType> = data.posts;
    posts.reverse();
    return posts;
  }

  const { isLoading, isError, data, error, isFetching } = useQuery({
    queryKey: ['posts'],
    queryFn: getPosts,
  });

  const addPost = useMutation({
    mutationFn: async (data: object) => {
      return axios.post(API_ROUTE, data);
    },
    onError: (error) => {
      console.log(error);
      toast.error('Something went wrong');
    },
    onSuccess: () => {
      console.log('Working..');
      titleInput.current.value = '';
      contentInput.current.value = '';
      setContentCharCount(0);
      queryClient.invalidateQueries({ queryKey: ['posts'] });
    },
  });

  function submitPost(event: FormEvent) {
    event.preventDefault();

    const formData = new FormData(event.target as HTMLFormElement);
    const title = formData.get('title') as string;
    const content = formData.get('content') as string;

    if (!title || !content) {
      toast.error('Please include both a title and content');
      return;
    }

    if (contentCharCount > maxCharLength) {
      toast.error(`Content cannot be more than ${maxCharLength} characters`);
      return;
    }

    const data = { title, content };

    addPost.mutate(data);
  }

  return (
    <div>
      <Toaster />
      <form
        className="bg-slate-300 w-5/12 m-auto mt-10 h-80 rounded-md shadow-lg"
        onSubmit={submitPost}
      >
        <div className="p-8">
          <input
            name="title"
            className="inline my-2 w-11/12 px-1 py-2 rounded-sm"
            type="text"
            placeholder="What's the title?"
            autoComplete="off"
            ref={titleInput}
          />
          <textarea
            name="content"
            className="block my-3 w-11/12 h-32 px-1 py-2 rounded-sm"
            placeholder="say whats on your mind... 🤔"
            onChange={(event) => setContentCharCount(event.target.value.length)}
            ref={contentInput}
          />
          <label
            className="block ml-4"
            style={
              contentCharCount > maxCharLength
                ? { color: 'red' }
                : { color: 'initial' }
            }
          >
            {contentCharCount}/{maxCharLength}
          </label>
          <input
            className="mt-0 mr-5 bg-blue-500 px-10 py-1 text-white rounded-md cursor-pointer float-right"
            type="submit"
            value="Post"
          />
        </div>
      </form>
      <div className="w-5/12 m-auto mt-10">
        {isLoading || isFetching ? (
          <Loading />
        ) : isError ? (
          'Error...'
        ) : (
          data.map((post: PostType) => {
            return (
              <Post
                key={post.id}
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
