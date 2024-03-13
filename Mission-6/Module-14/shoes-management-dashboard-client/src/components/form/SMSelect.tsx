import { Form, Select } from "antd";
import { Controller } from "react-hook-form";

type TSMSelectProps = {
  label: string;
  name: string;
  options: { value: string; label: string; disabled?: boolean }[] | undefined;
  disabled?: boolean;
  mode?: "multiple" | undefined;
  placeholder?: string;
};

const SMSelect = ({ label, name, options, disabled, mode, placeholder }: TSMSelectProps) => {
  return (
    <Controller
      name={name}
      render={({ field, fieldState: { error } }) => (
        <Form.Item label={label}>
          <Select
            {...field}
            style={{ width: "100%" }}
            options={options}
            disabled={disabled}
            mode={mode}
            size="large"
            placeholder={placeholder}
          />
          {error && <small style={{ color: "red" }}>{error.message}</small>}
        </Form.Item>
      )}
    />
  );
};
export default SMSelect;
