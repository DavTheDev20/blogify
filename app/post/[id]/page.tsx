'use client';

import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { PostType } from '@/types/types';
import Post from '@/app/components/Post';
import Loading from '@/app/components/Loading';

export default function PostPage({ params }: { params: { id: string } }) {
  const { id } = params;

  const { data, error, isLoading } = useQuery({
    queryKey: ['post'],
    queryFn: async () => {
      const response = await axios.get(`/api/post/${id}`);
      const data = await response.data;
      const post = data.post as PostType;
      return post;
    },
  });

  const comments = [
    {
      id: 1,
      content: 'Well said!',
      name: 'lamarjones98',
      image:
        'https://this-person-does-not-exist.com/img/avatar-gen1123aabd408d354520b4a74b97393e8c.jpg',
    },
  ];

  if (isLoading) return <Loading />;

  return (
    <div className="w-1/2 m-auto">
      <Post
        key={data?.id}
        id={data?.id as number}
        title={data?.title as string}
        content={data?.content as string}
        createdAt={data?.createdAt as Date}
        name={data?.user.name as string}
        image={data?.user.image as string}
      />
      <div>{/* Add Comments Section */}</div>
    </div>
  );
}
