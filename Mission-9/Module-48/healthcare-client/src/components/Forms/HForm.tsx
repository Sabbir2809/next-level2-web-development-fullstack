import React from "react";
import { FieldValues, FormProvider, SubmitHandler, useForm } from "react-hook-form";

// types
type TFormConfig = {
  resolver?: any;
};
type TFormProps = {
  children: React.ReactNode;
  onSubmit: SubmitHandler<FieldValues>;
} & TFormConfig;

const HForm = ({ children, onSubmit, resolver }: TFormProps) => {
  // validation
  const formConfig: TFormConfig = {};
  if (resolver) {
    formConfig["resolver"] = resolver;
  }
  // Custom hook to manage the entire form.
  const methods = useForm(formConfig);
  const { handleSubmit, reset } = methods;

  // submit handler
  const submit: SubmitHandler<FieldValues> = (data) => {
    // console.log(data);
    onSubmit(data);
    reset();
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(submit)}>{children}</form>
    </FormProvider>
  );
};

export default HForm;
