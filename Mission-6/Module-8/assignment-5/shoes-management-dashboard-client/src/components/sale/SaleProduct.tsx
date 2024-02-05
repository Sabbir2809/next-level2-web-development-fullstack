import { FieldValues, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { setIsSaleActiveModal } from "../../redux/features/modal/modalSlice";
import { useCreateSaleMutation } from "../../redux/features/sale/saleApi";
import { useAppDispatch } from "../../redux/hooks";
import { TProduct } from "../../types";

const SaleProduct = ({ saleProduct }: { saleProduct: TProduct | null }) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [createSale] = useCreateSaleMutation();

  const { register, handleSubmit } = useForm();
  const onSubmit = (data: FieldValues) => {
    dispatch(setIsSaleActiveModal(true));
    const productInfo = {
      productId: saleProduct?._id,
      quantitySold: Number(data.quantity),
      buyerName: data.buyerName,
      saleDate: data.date,
    };
    createSale(productInfo).unwrap();
    dispatch(setIsSaleActiveModal(false));
    navigate("/sales-history");
  };

  return (
    <form className="max-w-md mx-auto" onSubmit={handleSubmit(onSubmit)}>
      <div className="relative z-0 w-full mb-5 group">
        <input
          type="text"
          id="buyerName"
          {...register("buyerName", { required: true })}
          className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
          placeholder="Buyer Name"
        />
      </div>
      <div className="grid md:grid-cols-2 md:gap-6">
        <div className="relative z-0 w-full mb-5 group">
          <input
            type="number"
            {...register("quantity", { required: true })}
            id="quantity"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder="Product Quantity"
          />
        </div>
        <div className="relative z-0 w-full mb-5 group">
          <input
            type="date"
            {...register("date")}
            id="date"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder="Date Of the Sale"
          />
        </div>
      </div>

      <button
        type="submit"
        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
        Submit
      </button>
    </form>
  );
};
export default SaleProduct;
