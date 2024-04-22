const AllShoes = async () => {
  const res = await fetch("http://localhost:5000/shoes", {
    cache: "no-cache", // server-rendered on
  });
  const shoes = await res.json();

  return (
    <div className="flex justify-between flex-wrap p-4">
      {shoes.map(({ id, title, description, price }) => (
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
  );
};

export default AllShoes;
