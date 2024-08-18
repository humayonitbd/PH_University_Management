import { Form, Select } from "antd";
import { useEffect } from "react";
import { Controller, useFormContext , useWatch} from "react-hook-form";

type TPHSelectProps = {
  label: string;
  name: string;
  options?: { value: string; label: string; disabled?: boolean }[] | undefined;
  disabled?: boolean;
  mode?: "multiple" | undefined;
  onValueChange: React.Dispatch<React.SetStateAction<undefined>>;
};

const PHSelectByWatch = ({ label, name, options, disabled, mode, onValueChange }: TPHSelectProps) => {
    const {control} = useFormContext();
    const inputValueWatch = useWatch({
        control,
        name,
    });

    useEffect(() => {
      onValueChange(inputValueWatch);
    }, [inputValueWatch]);
    console.log(inputValueWatch);
  return (
    <Controller
      name={name}
      render={({ field, fieldState: { error } }) => (
        <Form.Item label={label}>
          <Select
            mode={mode}
            style={{ width: "100%" }}
            {...field}
            options={options}
            disabled={disabled}
          />
          {error && <small style={{ color: "red" }}>{error.message}</small>}
        </Form.Item>
      )}
    />
  );
};

export default PHSelectByWatch;
