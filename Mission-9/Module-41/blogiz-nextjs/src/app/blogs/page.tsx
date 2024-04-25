"use client";

import BlogCard from "@/components/ui/BlogCard";
import { useGetBlogsQuery } from "@/redux/api/baseApi";
import { IBlog } from "@/types";

const BlogsPage = () => {
  const { data: blogs, isLoading, isError, error } = useGetBlogsQuery(undefined);

  return (
    <div className="w-[90%] mx-auto">
      <h1 className="text-4xl text-center my-5">
        All Blogs From <span className="text-accent">Blogiz</span>
      </h1>
      <p className="text-xl text-center text-gray-400 w-2/4 mx-auto">
        <em>
          Dive into the fascinating world of quantum computing, where unlocking unprecedented
          computational power.
        </em>
      </p>
      <div className="grid grid-cols-3 gap-4 mt-5">
        {blogs?.map((blog: IBlog) => (
          <BlogCard blog={blog} key={blog.id} />
        ))}
      </div>
    </div>
  );
};

export default BlogsPage;
