import LatestBlogs from "@/components/LatestBlogs/LatestBlogs";

const HomePage = async () => {
  const response = await fetch("http://localhost:5000/blogs", {
    next: {
      revalidate: 30,
    },
  });
  const blogs = await response.json();

  return <LatestBlogs blogs={blogs} />;
};

export default HomePage;
