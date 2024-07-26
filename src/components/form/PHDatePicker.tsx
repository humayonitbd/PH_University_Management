import { DatePicker, Form } from "antd";
import { Controller, useFormContext } from "react-hook-form";
import dayjs from "dayjs";

type TDatePickerProps = {
  name: string;
  label?: string;
};

const PHDatePicker = ({ name, label }: TDatePickerProps) => {
  const { control } = useFormContext();
  return (
    <div style={{ marginBottom: "20px" }}>
      <Controller
        name={name}
        control={control}
        render={({ field }) => {
          return (
            <Form.Item label={label}>
              <DatePicker
                {...field}
                value={field.value ? dayjs(field.value) : null}
                onChange={(date) => {
                  const isoDate = date ? date.toISOString() : null;
                  field.onChange(isoDate);
                }}
                size="large"
                style={{ width: "100%" }}
              />
            </Form.Item>
          );
        }}
      />
    </div>
  );
};

export default PHDatePicker;

