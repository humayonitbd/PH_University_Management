import { Button } from "antd";
import { useForm } from "react-hook-form";
import { useLoginMutation } from "../../redux/features/auth/authApi";
import { useAppDispatch } from "../../redux/hooks";
import { setUser } from "../../redux/features/auth/authSlice";
import { verifyToken } from "../../utils/verifyToken";
import { useLocation, useNavigate } from "react-router-dom";


const Login = () => {
  const {register, handleSubmit} = useForm();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";
  console.log("location", location);
  console.log("state", location.state);
  console.log("path", location.state?.from?.pathname);

  const [login,{ isError}] = useLoginMutation();

  const onSubmit = async(data:any) => {
    const userInfo = {
      id:data.id,
      password:data.password,
    }
    
   const res = await login(userInfo).unwrap();
   const user = verifyToken(res?.data?.accessToken);
   dispatch(setUser({ user: user, token: res?.data?.accessToken }));
    navigate(from, { replace: true });
  };


    return (
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label htmlFor="id">ID:</label>
          <input type="text" id="id" {...register("id")} />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input type="text" id="password" {...register("password")} />
        </div>
        <Button htmlType="submit">Login</Button>
      </form>
    );
};

export default Login;