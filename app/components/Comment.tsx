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
  return (
    <div className="my-5 bg-slate-200 w-5/6 mx-auto rounded-lg p-5">
      <img
        src={image}
        width={40}
        height={40}
        className="rounded-full inline mb-2"
      />
      {/* <Image src={image} width={100} height={100} alt="Profile image" /> */}
      <h2 className="inline ml-4">{user}</h2>
      <small className="font-thin text-gray-400 block">
        {new Date(createdAt).toLocaleDateString('en-us', {
          month: 'short',
          day: 'numeric',
        })}
      </small>
      <hr />
      <p>{content}</p>
    </div>
  );
}
