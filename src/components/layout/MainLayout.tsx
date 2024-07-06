import { Button, Layout } from "antd";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import { useAppDispatch } from "../../redux/hooks";
import { logOut } from "../../redux/features/auth/authSlice";
import { toast } from "sonner";



const { Header,  Content } = Layout;

const MainLayout = () => {
  const dispatch = useAppDispatch();
  const handleLogout =()=>{
    const tostId = toast.loading('logOut lodding!!')
    dispatch(logOut());
    toast.success('logOut Successfull !!',{id:tostId})
  }
  return (
    <Layout style={{ height: "100vh" }}>
      <Sidebar />
      <Layout>
       <Header > <Button onClick={handleLogout}>LogOut</Button></Header>
        <Content style={{ margin: "24px 16px 0" }}>
          <div
            style={{
              padding: 24,
              minHeight: 360,
            }}
          >
            <Outlet />
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default MainLayout;
