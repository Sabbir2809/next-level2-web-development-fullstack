"use client";

import { registerUser } from "@/utils/actions/registerUser";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import signupSVG from "./../../../public/signup.svg";

export type TUserData = {
  username: string;
  email: string;
  password: string;
};

const RegisterPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TUserData>();

  const router = useRouter();

  const onSubmit = async (data: TUserData) => {
    try {
      const res = await registerUser(data);
      if (res.success) {
        alert(res.message);
        router.push("/login");
      }
    } catch (err: any) {
      console.error(err.message);
      throw new Error(err.message);
    }
  };

  return (
    <div className="my-10">
      <h1 className="text-center text-4xl mb-5">
        Register <span className="text-accent">Now</span>
      </h1>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Image
            src={signupSVG}
            width={500}
            height={200}
            alt="login page"
            className="w-full h-[85%]"
          />
        </div>

        <div className="card w-[70%] shadow-xl bg-base-100">
          <form onSubmit={handleSubmit(onSubmit)} className="card-body py-3">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Full Name</span>
              </label>
              <input
                type="text"
                {...register("username")}
                placeholder="User Name"
                className="input input-bordered"
                required
              />
            </div>
            <div className="form-control">
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
                Register
              </button>
            </div>
            <p className="text-center">
              Already have an account?{" "}
              <Link className="text-accent" href="/login">
                Login
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
