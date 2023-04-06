import Image from 'next/image';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export default function Home() {
  return (
    <div>
      <form className="bg-slate-300 w-5/12 m-auto mt-10 h-80 rounded-md">
        <div className="p-10">
          <label>What are you telling us?</label>
          <input
            name="title"
            className="block my-2 w-4/5 p-1"
            type="text"
            placeholder="enter a title"
            autoComplete="off"
          />
          <label>Say whats on your mind!</label>
          <textarea
            name="content"
            className="block my-2 w-4/5 h-28 p-1"
            placeholder="type your thoughts... 🤔"
          />
          <input
            className="mt-2 bg-blue-500 px-6 py-1 mb-1 text-white rounded-md cursor-pointer"
            type="submit"
            value="Post"
          />
        </div>
      </form>
      <div></div>
    </div>
  );
}
