import {Outlet} from "react-router-dom";
const AdminLayout = () => {
    return (
        <div>
            <h1>Navber here ....</h1>
            <Outlet />
        </div>
    );
};

export default AdminLayout;