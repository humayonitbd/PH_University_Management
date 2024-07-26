import { useState } from "react";
import { Button, Modal as AntdModal } from "antd";
import { useUserStatusChangeMutation } from "../../redux/features/admin/UserManagementApi/UserManagementApi";
import { toast } from "sonner";

const Modal = ({id}:{id:string}) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [userStatusChangeHandler] = useUserStatusChangeMutation();

    const showModal = () => {
      setIsModalOpen(true);
    };

    const handleOk = async() => {
        const toastId = toast.loading("Changing ...");
        const data = {
          status: "blocked",
        };
        try {
            const res = await userStatusChangeHandler({id, data});
            console.log('status res',res)
            if (res?.error) {
              toast.error(res?.error?.data?.message, { id: toastId });
              setIsModalOpen(false);
            } else {
              toast.success(res?.data?.message, { id: toastId });
              setIsModalOpen(false);
            }
            
            
        } catch (error) {
            toast.error("Something went wrong", { id: toastId });
            setIsModalOpen(false);
            
        }

      
    };

    const handleCancel = () => {
      setIsModalOpen(false);
    };

    return (
      <>
        <Button type="primary" onClick={showModal}>
          Block
        </Button>
        <AntdModal
          open={isModalOpen}
          onOk={handleOk}
          onCancel={handleCancel}
        >
          <h1 style={{textAlign:'center', fontSize:'25px'}}>Are you Sure, You will blocked this user!!</h1>
        </AntdModal>
      </>
    );
};

export default Modal;