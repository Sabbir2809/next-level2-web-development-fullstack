import { Button, Row } from "antd";
import { FieldValues } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import UMForm from "../components/form/UMForm";
import UMInput from "../components/form/UMInput";
import { useChangePasswordMutation } from "../redux/features/admin/userManagementApi";
import { logout } from "../redux/features/auth/authSlice";
import { useAppDispatch } from "../redux/hooks";
import { TResponse } from "../types";

const ChangePassword = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [changePassword] = useChangePasswordMutation();

  const onsubmit = async (data: FieldValues) => {
    console.log(data);
    const res = (await changePassword(data)) as TResponse<any>;
    if (res?.data?.success) {
      dispatch(logout());
      return navigate("/login");
    }
  };

  return (
    <Row justify="center" align="middle" style={{ height: "100vh" }}>
      <UMForm onSubmit={onsubmit}>
        <UMInput type="password" name="oldPassword" label="Old Password" />
        <UMInput type="password" name="newPassword" label="New Password" />
        <Button htmlType="submit">Change Password</Button>
      </UMForm>
    </Row>
  );
};
export default ChangePassword;
