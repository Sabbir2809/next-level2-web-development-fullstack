import { authKey } from "@/constants/authKey";
import { decodedToken } from "@/utils/jwt";
import {
  getFromLocalStorage,
  removeFromLocalStorage,
  setToLocalStorage,
} from "@/utils/local-storage";

// set user info
export const storeUserInfo = ({ accessToken }: { accessToken: string }) => {
  return setToLocalStorage(authKey, accessToken);
};

// get user info
export const getUserInfo = () => {
  const authToken = getFromLocalStorage(authKey);
  if (authToken) {
    const decodedData = decodedToken(authToken);
    return {
      ...decodedData,
    };
  }
};

// check is logged in
export const isLoggedIn = () => {
  const authToken = getFromLocalStorage(authKey);
  if (authToken) {
    return !!authToken;
  }
};

// remove user info
export const removeUser = () => {
  return removeFromLocalStorage(authKey);
};
