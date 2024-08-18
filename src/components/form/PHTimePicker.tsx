import { Form, TimePicker } from "antd";
import { Controller } from "react-hook-form";
import dayjs from "dayjs";

type TDatePickerProps = {
  name: string;
  label?: string;
};

const PHTimePicker = ({ name, label }: TDatePickerProps) => {
const format = "HH:mm";
  return (
    <div style={{ marginBottom: "20px" }}>
      <Controller
        name={name}
        render={({ field }) => {
          return (
            <Form.Item label={label}>
              <TimePicker
                {...field}
                value={field.value ? dayjs(field.value, format) : null}
                format={format}
                size="large"
                style={{ width: "100%" }}
                onChange={(time) =>
                  field.onChange(time ? dayjs(time).format(format) : null)
                }
              />
            </Form.Item>
          );
        }}
      />
    </div>
  );
};

export default PHTimePicker;
