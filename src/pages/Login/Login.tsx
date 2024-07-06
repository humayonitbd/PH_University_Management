import { Button, Row } from "antd";
import { FieldValues,} from "react-hook-form";
import  authApi from "../../redux/features/auth/authApi";
import { useAppDispatch } from "../../redux/hooks";
import { TUser, setUser } from "../../redux/features/auth/authSlice";
import { verifyToken } from "../../utils/verifyToken";
import { useLocation, useNavigate } from "react-router-dom";
import {toast} from 'sonner';
import PHform from "../../components/form/PHform";
import PHInput from "../../components/form/PHInput";


const Login = () => {
  
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  // const location = useLocation();
  // const from = location.state?.from?.pathname || "/";
  

  const defaultValues = {
    id:'A-0001',
    password:'admin123',
  }



  const [login] = authApi.useLoginMutation();

  const onSubmit = async(data:FieldValues) => {
    console.log('data',data)
   const tostId = toast.loading("Logging in");
    try {
      const userInfo = {
        id: data.id,
        password: data.password,
      };
      
      const res = await login(userInfo).unwrap();
      const user = verifyToken(res?.data?.accessToken) as TUser;
      dispatch(setUser({ user: user, token: res?.data?.accessToken }));
      toast.success('Login Successfull !!', {id:tostId, duration:2000 })
      navigate(`/${user?.role}/dashboard`);
      
    } catch (error) {
      toast.error("Something went wrong!", { id: tostId, duration: 2000 });
    }
    
    
  };


    return (
      <Row justify="center" align="middle" style={{ height: "100vh" }}>
        <PHform onSubmit={onSubmit} defaultValues={defaultValues}>
          <PHInput type="text" name="id" label="User ID: " />
          <PHInput type="password" name="password" label="Password: " />
          <Button htmlType="submit">Login</Button>
        </PHform>
      </Row>
    );
};

export default Login;