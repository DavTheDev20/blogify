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

  return (
    <div className="my-8">
      <h2 className="text-lg font-semibold">{title}</h2>
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
      <p className="font-light">
        {content.slice(0, 200)}...{' '}
        <Link href="#" className="text-blue-400 hover:underline">
          Read More
        </Link>
      </p>
    </div>
  );
}
