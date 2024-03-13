import { FieldValues, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { MdOutlineAlternateEmail, MdPassword } from "react-icons/md";
import { Link } from "react-router-dom";
import { useLoginMutation } from "../redux/features/auth/authApi";
import { TUser, setUser } from "../redux/features/auth/authSlice";
import { useAppDispatch } from "../redux/hooks";
import { verifyToken } from "../utils/verifyToken";
import loginImg from "./../assets/login.svg";

const Login = () => {
  const dispatch = useAppDispatch();

  const [login] = useLoginMutation();

  const { register, handleSubmit } = useForm();

  const onSubmit = async (data: FieldValues) => {
    try {
      const userInfo = {
        email: data.email,
        password: data.password,
      };
      const res = await login(userInfo).unwrap();
      const user = verifyToken(res.data.accessToken) as TUser;

      dispatch(setUser({ user: user, token: res.data.accessToken }));

      toast.success("Login Successfully");
      window.location.href = "/";
    } catch (error) {
      toast.error("Something Went Wrong!");
    }
  };

  return (
    <div className="min-w-screen min-h-screen flex items-center justify-center px-5 py-5">
      <div
        className="bg-gray-100 text-gray-500 rounded-3xl shadow-xl w-full overflow-hidden"
        style={{ maxWidth: 1000 }}>
        <div className="md:flex w-full">
          <div className="hidden md:block w-1/2 bg-indigo-500 py-10 px-10">
            <img src={loginImg} alt="" />
          </div>
          <div className="w-full md:w-1/2 py-10 px-5 md:px-10">
            <div className="text-center mb-10">
              <h1 className="font-bold text-3xl text-gray-900">Login</h1>
            </div>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="flex -mx-3">
                <div className="w-full px-3 mb-5">
                  <label className="text-xs font-semibold px-1">Email</label>
                  <div className="flex">
                    <div className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center">
                      <MdOutlineAlternateEmail />
                    </div>
                    <input
                      type="email"
                      className="w-full -ml-10 pl-10 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500"
                      {...register("email")}
                    />
                  </div>
                </div>
              </div>
              <div className="flex -mx-3">
                <div className="w-full px-3 mb-12">
                  <label className="text-xs font-semibold px-1">Password</label>
                  <div className="flex">
                    <div className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center">
                      <MdPassword />
                    </div>
                    <input
                      type="password"
                      className="w-full -ml-10 pl-10 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500"
                      {...register("password")}
                    />
                  </div>
                </div>
              </div>
              <div className="flex -mx-3">
                <div className="w-full px-3 mb-5">
                  <button
                    type="submit"
                    className="block w-full max-w-xs mx-auto bg-indigo-500 hover:bg-indigo-700 focus:bg-indigo-700 text-white rounded-lg px-3 py-3 font-semibold">
                    Login
                  </button>
                </div>
              </div>
            </form>
            <div className="text-center">
              <Link
                to="/register"
                className="inline-block text-sm text-blue-500 align-baseline hover:text-blue-800">
                Don't have an account yet? Register Now
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
