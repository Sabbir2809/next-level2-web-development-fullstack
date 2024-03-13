import { Types } from "mongoose";
import { USER_ROLE } from "./userAuth.constant";

export type TPolishServices = {
  polishId: Types.ObjectId;
};

export type TCarts = {
  productId: Types.ObjectId;
  productColor: string;
  productSize: string;
  productQuantity: string;
};

export interface IUser {
  name: string;
  email: string;
  password: string;
  role: string;
  polishServices: [TPolishServices];
  carts: [TCarts];
}

export interface ILogin {
  email: string;
  password: string;
}

export type TUserRole = keyof typeof USER_ROLE;
