import LoadingCard from "@/components/ui/LoadingCard";
import { IBlog } from "@/types";

const BlogLoadingPage = async () => {
  const res = await fetch("http://localhost:5000/blogs");
  const blogs = await res.json();

  return (
    <div>
      <div className="grid grid-cols-3 gap-4">
        {blogs.map((blog: IBlog) => (
          <LoadingCard key={blog.id} />
        ))}
      </div>
    </div>
  );
};

export default BlogLoadingPage;
