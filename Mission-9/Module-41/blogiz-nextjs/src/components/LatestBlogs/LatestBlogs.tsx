import { IBlog } from "@/types";
import BlogCard from "../ui/BlogCard";
import LatestBlogCard from "../ui/LatestBlogCard";

const LatestBlogs = ({ blogs }: { blogs: IBlog[] }) => {
  return (
    <div className="w-[90%] mx-auto">
      <h1 className="text-4xl text-center my-5">
        Latest Blogs From <span className="text-accent">Blogiz</span>
      </h1>
      <p className="text-xl text-center text-gray-400 w-2/4 mx-auto">
        <em>
          Dive into the fascinating world of quantum computing, where unlocking unprecedented
          computational power.
        </em>
      </p>

      <div className="grid grid-cols-2 gap-4 my-5">
        {blogs.slice(0, 2).map((blog) => (
          <LatestBlogCard key={blog.id} blog={blog} />
        ))}
      </div>

      <div className="grid grid-cols-3 gap-4 my-5">
        {blogs.slice(3, 6).map((blog) => (
          <BlogCard key={blog.id} blog={blog} />
        ))}
      </div>
    </div>
  );
};

export default LatestBlogs;
