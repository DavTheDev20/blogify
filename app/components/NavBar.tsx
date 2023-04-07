import Link from 'next/link';

export default function NavBar() {
  return (
    <nav className="flex h-14 mb-5 bg-slate-200">
      <div className="flex items-center justify-between w-1/2 m-auto text-blue-400 text-lg">
        <Link href={'/'} className="hover:text-blue-600">
          blogify
        </Link>
        <a href={'#'} className="hover:text-blue-600">
          login
        </a>
      </div>
    </nav>
  );
}
