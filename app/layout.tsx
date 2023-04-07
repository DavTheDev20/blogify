import './globals.css';
import NavBar from './components/NavBar';
import Providers from './providers';

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
        <NavBar />
        <Providers>{children}</Providers>
        <footer className="text-center mt-40">
          © Davin Reid {new Date().getFullYear()}
        </footer>
      </body>
    </html>
  );
}
