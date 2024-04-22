import Link from "next/link";

export const metadata = {
  title: "Home Page",
  description: "This is our home page",
};

const HomePage = async () => {
  const response = await fetch("http://localhost:5000/shoes", {
    // cache: "force-cache",
    next: {
      revalidate: 30,
    },
  });
  const shoes = await response.json();

  return (
    <div className="text-center my-4">
      <div className="flex justify-center flex-wrap p-4">
        {shoes.slice(0, 3).map(({ id, title, description, price }) => (
          <div className="card w-80 glass m-4" key={id}>
            <figure>
              <img
                src="https://daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg"
                alt="car!"
              />
            </figure>
            <div className="card-body">
              <h2 className="card-title">{title}</h2>
              <span className="badge badge-secondary">TK. {price}</span>
              <p>{description}</p>
              <div className="card-actions justify-end">
                <button className="btn btn-primary">Add To Cart</button>
              </div>
            </div>
          </div>
        ))}
      </div>
      <Link href="/all-shoes" className="btn btn-outline btn-primary">
        See More
      </Link>
    </div>
  );
};

export default HomePage;
