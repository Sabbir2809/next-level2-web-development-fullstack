/* eslint-disable @typescript-eslint/ban-ts-comment */
import { FieldValues, useForm } from "react-hook-form";
import { setIsEditActiveModal } from "../../redux/features/modal/modalSlice";
import { useUpdateProductMutation } from "../../redux/features/product/productApi";
import { useAppDispatch } from "../../redux/hooks";

const UpdateProduct = ({ updatedProduct }: { updatedProduct: any }) => {
  const dispatch = useAppDispatch();

  const { register, handleSubmit } = useForm();
  const [updateProduct] = useUpdateProductMutation();

  const onSubmit = (data: FieldValues) => {
    dispatch(setIsEditActiveModal(true));
    const options = {
      // @ts-ignore
      productId: updatedProduct?._id,
      data: {
        ...data,
        price: Number(data.price),
        quantity: Number(data.quantity),
      },
    };
    updateProduct(options);
    dispatch(setIsEditActiveModal(false));
  };

  return (
    <form className="max-w-md mx-auto" onSubmit={handleSubmit(onSubmit)}>
      <div className="relative z-0 w-full mb-5 group">
        <input
          type="text"
          id="name"
          {...register("name")}
          className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
          placeholder="Product Name"
          defaultValue={updatedProduct?.name}
        />
      </div>
      <div className="grid md:grid-cols-2 md:gap-6">
        <div className="relative z-0 w-full mb-5 group">
          <input
            type="text"
            {...register("price")}
            id="price"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder="Product Price"
            defaultValue={updatedProduct?.price}
          />
        </div>
        <div className="relative z-0 w-full mb-5 group">
          <input
            type="text"
            {...register("quantity")}
            id="quantity"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder="Quantity"
            defaultValue={updatedProduct?.quantity}
          />
        </div>
      </div>
      <div className="grid md:grid-cols-2 md:gap-6">
        <div className="relative z-0 w-full mb-5 group">
          <input
            type="text"
            {...register("brand")}
            id="brand"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder="Band Name"
            defaultValue={updatedProduct?.brand}
          />
        </div>
        <div className="relative z-0 w-full mb-5 group">
          <input
            type="text"
            {...register("model")}
            id="model"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder="Product Model"
            defaultValue={updatedProduct?.model}
          />
        </div>
      </div>
      <div className="grid md:grid-cols-2 md:gap-6">
        <div className="relative z-0 w-full mb-5 group">
          <input
            type="text"
            {...register("size")}
            id="size"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder="Product Size"
            defaultValue={updatedProduct?.size}
          />
        </div>
        <div className="relative z-0 w-full mb-5 group">
          <input
            type="text"
            {...register("style")}
            id="style"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder="style"
            defaultValue={updatedProduct?.style}
          />
        </div>
      </div>
      <div className="grid md:grid-cols-2 md:gap-6">
        <div className="relative z-0 w-full mb-5 group">
          <input
            type="text"
            {...register("color")}
            id="color"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder="Color"
            defaultValue={updatedProduct?.color}
          />
        </div>
        <div className="relative z-0 w-full mb-5 group">
          <input
            type="text"
            {...register("releaseDate")}
            id="releaseDate"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder="Release Date"
            defaultValue={updatedProduct?.releaseDate}
          />
        </div>
      </div>

      <button
        type="submit"
        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
        Update Shoes
      </button>
    </form>
  );
};

export default UpdateProduct;
