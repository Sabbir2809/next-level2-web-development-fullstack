import { getUserInfo, removeUser } from "@/services/auth.services";
import { Button } from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/navigation";

type TUserInfo = {
  email: string;
  role: string;
  userId: string;
};

const AuthButton = () => {
  const router = useRouter();
  const userInfo = getUserInfo() as TUserInfo;

  const handleLogout = () => {
    removeUser();
    router.refresh();
  };

  return (
    <>
      {userInfo?.userId ? (
        <Button component={Link} href="/login" color="error" onClick={handleLogout}>
          Logout
        </Button>
      ) : (
        <Button component={Link} href="/login">
          Login
        </Button>
      )}
    </>
  );
};

export default AuthButton;
