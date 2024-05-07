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
    url: "https://sandbox.sslcommerz.com/gwprocess/v3/api.php",
    data: data,
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
  });

  return response.data;
};

// :::ssl commerz ipn listener query:::
// http://localhost:5000/api/v1/payment/ipn?amount=1150.00&bank_tran_id=151114130739MqCBNx5&card_brand=VISA&card_issuer=BRAC+BANK%2C+LTD.&card_issuer_country=Bangladesh&card_issuer_country_code=BD&card_no=432149XXXXXX0667&card_type=VISA-Brac+bank¤cy=BDT&status=VALID&store_amount=1104.00&store_id=test64e6e4fa31144&tran_date=2015-11-14+13%3A07%3A12&tran_id=5646dd9d4b484&val_id=151114130742Bj94IBUk4uE5GRj&verify_sign=ee93a5bf83f55703905c9b5ab0d558ce&verify_key=amount%2Cbank_tran_id%2Ccard_brand%2Ccard_issuer%2Ccard_issuer_country%2Ccard_issuer_country_code%2Ccard_no%2Ccard_type%2Ccurrency%2Cstatus%2Cstore_amount%2Cstore_id%2Ctran_date%2Ctran_id%2Cval_id
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
