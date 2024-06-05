import axios from "axios";
import httpStatus from "http-status";
import config from "../../config";
import ApiError from "../../errors/ApiError";
import { IPaymentData } from "./SSLCommerz.interface";

const initPayment = async (paymentData: IPaymentData) => {
  const data = {
    store_id: config.SSLCommerz.store_id,
    store_passwd: config.SSLCommerz.store_password,
    is_live: config.SSLCommerz.is_live,
    total_amount: paymentData.amount,
    currency: "BDT",
    tran_id: paymentData.transactionId, // use unique tran_id for each api call
    success_url: config.SSLCommerz.success_url,
    fail_url: config.SSLCommerz.fail_url,
    cancel_url: config.SSLCommerz.cancel_url,
    ipn_url: config.SSLCommerz.ipn_url,
    shipping_method: "N/A",
    product_name: "Appointment",
    product_category: "Service",
    product_profile: "general",
    cus_name: paymentData.name,
    cus_email: paymentData.email,
    cus_add1: paymentData.address,
    cus_add2: "N/A",
    cus_city: "Dhaka",
    cus_state: "Dhaka",
    cus_postcode: "1000",
    cus_country: "Bangladesh",
    cus_phone: paymentData.phoneNumber,
    cus_fax: "N/A",
    ship_name: "N/A",
    ship_add1: "N/A",
    ship_add2: "N/A",
    ship_city: "N/A",
    ship_state: "N/A",
    ship_postcode: 1000,
    ship_country: "N/A",
  };

  const response = await axios({
    method: "POST",
    url: config.SSLCommerz.ssl_payment_api,
    data: data,
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
  });

  return response.data;
};

const validatePayment = async (payload: any) => {
  try {
    const response = await axios({
      method: "GET",
      url: `${config.SSLCommerz.ssl_validation_api}?val_id=${payload.val_id}&store_id=${config.SSLCommerz.store_id}&store_passwd=${config.SSLCommerz.store_password}&format=json`,
    });
    return response.data;
  } catch (error) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Payment Validation Failed!");
  }
};

export const SSLCommerzServices = {
  initPayment,
  validatePayment,
};
