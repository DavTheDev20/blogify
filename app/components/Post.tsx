import Image from 'next/image';
import Link from 'next/link';

export default function Post({
  id,
  title,
  content,
  createdAt,
  name,
  image,
  comments,
}: {
  id: number;
  title: string;
  content: string;
  createdAt: Date;
  name: string;
  image: string;
  comments?: Array<object> | null;
}) {
  const currentYear = new Date().getFullYear();

  const author = {
    username: { name },
    profilePicture: { image },
  };

  return (
    <div className="my-8 bg-slate-200 p-8 rounded-lg">
      <Image
        src={author?.profilePicture.image}
        alt="Profile Image"
        width={40}
        height={40}
        className="inline rounded-full"
      />
      <h2 className="inline ml-4 font-semibold text-slate-500">
        {author.username.name}
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
        {comments ? (
          <Link
            href={`/post/${id}`}
            className="w-32 text-slate-700 font-semibold hover:cursor-pointer"
          >
            {0} Comments
          </Link>
        ) : null}
      </div>
    </div>
  );
}
