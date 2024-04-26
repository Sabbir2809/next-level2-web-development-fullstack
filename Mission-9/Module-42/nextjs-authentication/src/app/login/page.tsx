"use client";
import Image from "next/image";
import Link from "next/link";
import { useForm } from "react-hook-form";
import loginSVG from "./../../../public/login.svg";

type FormValues = {
  email: string;
  password: string;
};

const LoginPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();

  const onSubmit = async (data: FormValues) => {
    console.log(data);
  };

  return (
    <div className="my-10">
      <h1 className="text-center text-4xl mb-5">
        Login <span className="text-accent">Here</span>
      </h1>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Image
            src={loginSVG}
            width={500}
            height={200}
            alt="login page"
            className="w-full h-[85%]"
          />
        </div>

        <div className="card w-[70%] h-[70%] shadow-xl bg-base-100">
          <form onSubmit={handleSubmit(onSubmit)} className="card-body">
            <div className="form-control mt-5">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                {...register("email")}
                placeholder="Email"
                className="input input-bordered"
                required
              />
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                {...register("password")}
                type="password"
                placeholder="Password"
                className="input input-bordered"
                required
              />
            </div>

            <div className="form-control mt-6">
              <button type="submit" className="btn btn-accent btn-outline">
                Login
              </button>
            </div>
            <p className="text-center">
              Don&apos;t have an account?{" "}
              <Link className="text-accent" href="/register">
                Create an account
              </Link>
            </p>
          </form>
          <p className="text-center">Or Sign Up Using</p>
          <div className="flex justify-center mb-10 mt-2">
            <button className="btn btn-circle">
              <Image
                src="https://www.freepnglogos.com/uploads/google-logo-png/google-logo-png-webinar-optimizing-for-success-google-business-webinar-13.png"
                width={50}
                height={50}
                alt="google logo"
              />
            </button>
            <button className="btn btn-circle">
              <Image
                src="https://cdn-icons-png.flaticon.com/512/25/25231.png"
                width={35}
                height={35}
                alt="github logo"
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
