import Link from 'next/link';

export default function Post({
  title,
  content,
}: {
  title: string;
  content: string;
}) {
  return (
    <div className="my-8">
      <h2 className="text-lg">{title}</h2>
      <p>
        {content.slice(0, 200)}...{' '}
        <Link href="#" className="text-blue-400 hover:underline">
          Read More
        </Link>
      </p>
    </div>
  );
}
