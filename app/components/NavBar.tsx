'use client';

import Link from 'next/link';
import { useSession, signIn, signOut } from 'next-auth/react';

export default function NavBar() {
  const { data: session } = useSession();
  return (
    <nav className="flex h-14 mb-5 bg-slate-200">
      <div className="flex items-center justify-between w-1/2 m-auto text-blue-400 text-lg">
        <Link href={'/'} className="hover:text-blue-600">
          blogify
        </Link>
        {session ? (
          <div>
            <button onClick={() => signOut()} className="hover:text-blue-600">
              logout
            </button>
            <img
              className="inline ml-7"
              src={session.user?.image as string}
              width={40}
              height={40}
              alt="Profile Image"
              loading="lazy"
            />
          </div>
        ) : (
          <button
            className="hover:text-blue-600"
            onClick={() => {
              signIn();
            }}
          >
            login
          </button>
        )}
      </div>
    </nav>
  );
}
