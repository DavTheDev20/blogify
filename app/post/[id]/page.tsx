'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { CommentType, PostType } from '@/types/types';
import Post from '@/app/components/Post';
import { useSession } from 'next-auth/react';
import Loading from '@/app/components/Loading';
import Comment from '@/app/components/Comment';
import { FormEvent } from 'react';
import { toast, Toaster } from 'react-hot-toast';
import { useRef } from 'react';

export default function PostPage({ params }: { params: { id: string } }) {
  const { id } = params;

  const session = useSession();
  //@ts-ignore
  const commentRef: { current: HTMLInputElement } = useRef(null);
  const queryClient = useQueryClient();

  const addComment = useMutation({
    mutationFn: async (content: string) => {
      await axios.post('http://localhost:3000/api/comments', {
        content: content,
        postId: id,
        userId: session.data?.user,
      });
    },
    onSuccess() {
      commentRef.current.value = '';
      queryClient.invalidateQueries({ queryKey: ['comments'] });
    },
    onError(error: any) {
      console.log(error);
      toast.error(JSON.stringify(error.response.data?.error));
    },
  });

  const {
    data: postData,
    error: postError,
    isLoading: postIsLoading,
  } = useQuery({
    queryKey: ['post'],
    queryFn: async () => {
      const response = await axios.get(`/api/post/${id}`);
      const data = await response.data;
      const post = data.post as PostType;
      return post;
    },
  });

  const {
    data: commentsData,
    error: commentsError,
    isLoading: commentsAreLoading,
  } = useQuery({
    queryKey: ['comments'],
    queryFn: async () => {
      const response = await axios.get(`/api/post/${id}/comments`);
      const data = await response.data;
      const comments = data.comments as Array<CommentType>;
      return comments;
    },
  });

  function submitComment(event: FormEvent) {
    event.preventDefault();
    const formData = new FormData(event.target as HTMLFormElement);

    const content = formData.get('content') as string;
    if (!content) return toast.error('Please enter text to submit a comment.');
    addComment.mutate(content);
  }

  if (postIsLoading) return <Loading />;

  return (
    <div className="w-11/12 m-auto md:4/6 lg:w-1/2">
      <Toaster />
      <Post
        key={postData?.id}
        id={postData?.id as number}
        title={postData?.title as string}
        content={postData?.content as string}
        createdAt={postData?.createdAt as Date}
        name={postData?.user.name as string}
        image={postData?.user.image as string}
      />
      {/* Comments Section */}
      <div>
        <form className="w-2/3 mx-auto mb-4" onSubmit={submitComment}>
          <label className="block mb-2 text-lg">Add a Comment: </label>
          <input
            type="text"
            className="bg-slate-200 p-2 w-full"
            name="content"
            ref={commentRef}
          />
          <input
            type="submit"
            className="bg-blue-500 text-white py-1 px-2 rounded-md mt-2 cursor-pointer"
          />
        </form>
        {commentsAreLoading ? (
          <Loading />
        ) : (
          commentsData?.map((comment) => {
            return (
              <Comment
                content={comment.content}
                user={comment.user.name}
                image={comment.user.image}
                createdAt={new Date(2023, 3, 14)}
              />
            );
          })
        )}
        {}
      </div>
    </div>
  );
}
