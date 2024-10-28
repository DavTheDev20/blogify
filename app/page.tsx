"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import Post from "./components/Post";
import Loading from "./components/Loading";
import { FormEvent, useState, useRef } from "react";
import toast, { Toaster } from "react-hot-toast";
import { PostType } from "@/types/types";
import { useSession } from "next-auth/react";

export default function Home() {
  const maxCharLength = 250;

  const queryClient = useQueryClient();
  const session = useSession();

  const [contentCharCount, setContentCharCount] = useState(0);
  // @ts-ignore
  const titleInput: { current: HTMLInputElement } = useRef(null);
  // @ts-ignore
  const contentInput: { current: HTMLTextAreaElement } = useRef(null);

  async function getPosts() {
    const form = document.querySelector("form");
    if (localStorage.getItem("currTitle")?.length !== 0) {
      // @ts-ignore
      form.title.value = localStorage.getItem("currTitle");
    }
    if (localStorage.getItem("currContent")?.length !== 0) {
      // @ts-ignore
      form.content.value = localStorage.getItem("currContent");
    }
    const response = await axios.get(`/api/posts`);
    const data = await response.data;
    let posts: Array<PostType> = data.posts;
    posts.reverse();
    return posts;
  }

  const { isLoading, isError, data, error, isFetching } = useQuery({
    queryKey: ["posts"],
    queryFn: getPosts,
  });

  const addPost = useMutation({
    mutationFn: async (data: object) => {
      return axios.post(`/api/posts`, data);
    },
    onError: (error: any) => {
      if (error?.response.data.error)
        return toast.error(JSON.stringify(error?.response.data.error));
      toast.error("Something went wrong");
    },
    onSuccess: () => {
      console.log("Working..");
      titleInput.current.value = "";
      contentInput.current.value = "";
      localStorage.removeItem("currTitle");
      localStorage.removeItem("currContent");
      setContentCharCount(0);
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
  });

  function submitPost(event: FormEvent) {
    event.preventDefault();

    // Error if user is not signed in
    if (!session.data) {
      console.log(event.target);
      //@ts-ignore
      localStorage.setItem("currTitle", event.target.title.value as string);
      //@ts-ignore
      localStorage.setItem("currContent", event.target.content.value as string);
      return toast.error("Please login to submit post");
    }

    const formData = new FormData(event.target as HTMLFormElement);
    const title = formData.get("title") as string;
    const content = formData.get("content") as string;

    if (!title || !content) {
      toast.error("Please include both a title and some content");
      return;
    }

    if (contentCharCount > maxCharLength) {
      toast.error(`Content cannot be more than ${maxCharLength} characters`);
      return;
    }

    const data = { title, content };

    addPost.mutate(data);
  }

  return (
    <div>
      <Toaster />
      <form
        className="bg-slate-300 sm:w-full m-auto mt-10 h-80 rounded-md shadow-lg lg:w-7/12"
        onSubmit={submitPost}
      >
        <div className="p-8">
          <input
            name="title"
            className="inline my-2 w-full px-1 py-2 rounded-md text-lg"
            type="text"
            placeholder="What's the title?"
            autoComplete="off"
            ref={titleInput}
            onChange={(event) => {
              if (
                localStorage.getItem("currTitle") &&
                event.target.value.length === 0
              ) {
                localStorage.removeItem("currTitle");
              }
            }}
          />
          <textarea
            name="content"
            className="block my-3 w-full h-28 px-1 py-2 rounded-md text-lg"
            placeholder="say whats on your mind... 🤔"
            onChange={(event) => {
              setContentCharCount(event.target.value.length);
              if (event.target.value.length === 0) {
                localStorage.removeItem("currContent");
              }
            }}
            ref={contentInput}
          />
          <label
            className="block"
            style={
              contentCharCount > maxCharLength
                ? { color: "red" }
                : { color: "#6b7280" }
            }
          >
            {contentCharCount}/{maxCharLength}
          </label>
          <input
            className="mt-0 mr-5 bg-blue-500 px-10 py-2 text-white rounded-md cursor-pointer float-right active:bg-blue-700 transition-colors"
            type="submit"
            value="Post"
          />
        </div>
      </form>
      <div className="w-full m-auto mt-10 lg:w-6/12 md:w-7/12">
        {isLoading || isFetching ? (
          <Loading />
        ) : isError ? (
          "Error..."
        ) : data.length == 0 ? (
          "No posts..."
        ) : (
          data.map((post: PostType) => {
            return (
              <Post
                key={post.id}
                id={post.id}
                title={post.title}
                content={post.content}
                createdAt={post.createdAt}
                name={post.user.name}
                image={post.user.image}
                comments={post.Comment}
              />
            );
          })
        )}
      </div>
    </div>
  );
}
