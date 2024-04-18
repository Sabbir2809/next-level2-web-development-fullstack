const DynamicProductPage = ({ params, searchParams }) => {
  console.log(searchParams);

  return (
    <div>
      <h1>This is DynamicProductPage: {params.productId}</h1>
    </div>
  );
};

export default DynamicProductPage;
