import nextJsFeatures from "./../../../public/featuresOfNextJs.png"; // absolute path
// import nextJsFeatures from "./../../assets/featuresOfNextJs.png"; // relative path
import Image from "next/image";

export const metadata = {
  title: "Gallery Page",
  description: "This is Gallery Page",
};

const GalleryPage = () => {
  return (
    <div>
      <h1 className="text-4xl text-center">Image Optimizations</h1>
      <hr />

      <h2 className="text-2xl text-center">Image Component:</h2>
      <Image
        src="https://www.axelerant.com/hubfs/Imported_Blog_Media/nextjs_image1.jpg"
        alt="Image Components"
        width={500}
        height={500}
        // fill
        className="mx-auto m-2"
      />
      <hr />

      <h2 className="text-2xl text-center">Image Component Locally:</h2>
      <Image
        src={nextJsFeatures}
        alt="Feature of Next.js"
        width={500}
        height={500}
        // fill
        className="mx-auto"
      />
    </div>
  );
};

export default GalleryPage;
