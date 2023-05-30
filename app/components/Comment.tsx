import Image from 'next/image';

export default function Comment({
  image,
  user,
  content,
  createdAt,
}: {
  image: string;
  user: string;
  content: string;
  createdAt: Date;
}) {
  const currentYear = new Date().getFullYear();
  return (
    <div className="my-5 bg-slate-200 w-5/6 mx-auto rounded-lg p-5">
      <Image
        src={image}
        width={40}
        height={40}
        alt="Profile image"
        className="rounded-full inline mb-2"
        loading="lazy"
      />
      <h2 className="inline ml-4 font-semibold text-slate-500">{user}</h2>
      <small className="font-thin text-gray-400 block">
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
      <hr />
      <p>{content}</p>
    </div>
  );
}
