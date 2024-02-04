import { Form } from "antd";
import { ReactNode } from "react";
import { FieldValues, FormProvider, SubmitHandler, useForm } from "react-hook-form";

type TFormProps = {
  onSubmit: SubmitHandler<FieldValues>;
  children: ReactNode;
} & TFormConfig;

type TFormConfig = {
  defaultValues?: Record<string, any>;
  resolver?: any;
};

const UMForm = ({ onSubmit, children, defaultValues, resolver }: TFormProps) => {
  // form default value set
  const formConfig: TFormConfig = {};
  if (defaultValues) {
    formConfig["defaultValues"] = defaultValues;
  }
  if (resolver) {
    formConfig["resolver"] = resolver;
  }
  const methods = useForm(formConfig);

  return (
    <FormProvider {...methods}>
      <Form onFinish={methods.handleSubmit(onSubmit)} layout="vertical">
        {children}
      </Form>
    </FormProvider>
  );
};
export default UMForm;
