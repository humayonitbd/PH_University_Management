import { Button } from "antd";
import { useForm } from "react-hook-form";
import { useLoginMutation } from "../../redux/features/auth/authApi";
import { useAppDispatch } from "../../redux/hooks";
import { setUser } from "../../redux/features/auth/authSlice";


const Login = () => {
  const {register, handleSubmit} = useForm();
  const dispatch = useAppDispatch();

  const [login,{ isError}] = useLoginMutation();
  const onSubmit = async(data:any) => {
    const userInfo = {
      id:data.id,
      password:data.password,
    }
    console.log(data)
   const res = await login(userInfo).unwrap();
   dispatch(setUser({user:{}, token:res?.data?.accessToken}))
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