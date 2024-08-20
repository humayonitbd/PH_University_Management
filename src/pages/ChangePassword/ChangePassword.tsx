import { Button, Row } from "antd";
import PHform from "../../components/form/PHform";
import PHInput from "../../components/form/PHInput";
import { toast } from "sonner";
import { FieldValues } from "react-hook-form";
import authApi from "../../redux/features/auth/authApi";
import { useAppDispatch } from "../../redux/hooks";
import { logOut } from "../../redux/features/auth/authSlice";
import { useNavigate} from "react-router-dom"

const ChangePassword = () => {
    const [changePassword] = authApi.useChangePasswordMutation();
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const onSubmit = async (data: FieldValues) => {
        const tostId = toast.loading("Changing in");

        const changeData = {
          oldPassword: data.oldPassword,
          newPassword: data.newPassword,
        };

      try {
        const res = await changePassword(changeData).unwrap();
        if(res.success){
            toast.success("Change Password Successfull !!", {
              id: tostId,
              duration: 2000,
            });
            dispatch(logOut());
            navigate('/login');

        }else{
            toast.error(res.error.data.message)
        }

      } catch (error) {
        toast.error(`${error?.data?.message}`, { id: tostId, duration: 2000 });
      }
    };
    return (
      <div>
        <Row justify="center" align="middle" style={{ height: "100vh" }}>
          <PHform onSubmit={onSubmit}>
            <PHInput type="text" name="oldPassword" label="Old Password: " />
            <PHInput type="text" name="newPassword" label="New Password: " />
            <Button htmlType="submit">Submit</Button>
          </PHform>
        </Row>
      </div>
    );
};

export default ChangePassword;