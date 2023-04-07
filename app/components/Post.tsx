import { randomUUID } from 'crypto';
import Image from 'next/image';
import Link from 'next/link';

export default function Post({
  title,
  content,
  createdAt,
}: {
  title: string;
  content: string;
  createdAt: Date;
}) {
  const currentYear = new Date().getFullYear();

  const author = {
    username: 'michaelthomas89',
    profilePicture:
      'https://this-person-does-not-exist.com/img/avatar-gen11458b284947739865cd857e828f1f21.jpg',
  };

  const comments = [{}, {}];

  return (
    <div className="my-8 bg-slate-200 p-8 rounded-lg">
      <img src={author.profilePicture} className="w-12 rounded-full inline" />
      <h2 className="inline ml-4 font-semibold text-slate-500">
        {author.username}
      </h2>
      <hr className="my-2 border-b-1 border-slate-300 w-2/6 opacity-50 " />
      <h3 className="text-md font-semibold mt-1">{title}</h3>
      <small className="font-thin text-gray-400">
        {/* If there is a post that is from a previous year, show year in date */}
        {new Date(createdAt).getFullYear() === currentYear
          ? new Date(createdAt).toLocaleDateString('en-US', {
              month: 'short',
              day: 'numeric',
            })
          : new Date(createdAt).toLocaleDateString('en-US', {
              month: 'short',
              day: 'numeric',
              year: 'numeric',
            })}
      </small>
      <p className="font-light">{content}</p>
      <div className="mt-3">
        <p className="text-slate-700 font-semibold hover:cursor-pointer">
          {comments.length} Comments
        </p>
      </div>
    </div>
  );
}
