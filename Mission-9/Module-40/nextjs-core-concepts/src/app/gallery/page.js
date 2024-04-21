import Image from "next/image";

const GalleryPage = () => {
  return (
    <div>
      <h1 className="text-4xl text-center">Image Optimizations</h1>
      <hr />

      <h2 className="text-2xl text-center">Regular Image Tag:</h2>
      <img
        src="https://www.axelerant.com/hubfs/Imported_Blog_Media/nextjs_image1.jpg"
        alt="Main Feature of Next.js"
        className="mx-auto"
      />
      <hr />

      <h2 className="text-2xl text-center">Image Component:</h2>
      <Image
        src="https://www.axelerant.com/hubfs/Imported_Blog_Media/nextjs_image1.jpg"
        alt="Main Feature of Next.js"
        width={500}
        height={500}
        className="mx-auto"
      />
      <hr />
    </div>
  );
};

export default GalleryPage;
