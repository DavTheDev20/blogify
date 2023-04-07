'use client';

import './globals.css';
import NavBar from './components/NavBar';
import Providers from './providers';
import { SessionProvider } from 'next-auth/react';

export const metadata = {
  title: 'Blogify',
  description: 'Where you voice can be heard!',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-slate-50">
        <SessionProvider>
          <NavBar />
          <Providers>{children}</Providers>
        </SessionProvider>
        <footer className="text-center mt-40 mb-5">
          © Davin Reid {new Date().getFullYear()}
        </footer>
      </body>
    </html>
  );
}
