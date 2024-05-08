export const modifyPayload = (values: any) => {
  const obj = { ...values };
  const file = obj["file"];
  delete obj["file"];

  // string
  const data = JSON.stringify(obj);

  // FormData instance
  const formData = new FormData();
  // append
  formData.append("data", data);
  formData.append("file", file as Blob);

  return formData;
};
