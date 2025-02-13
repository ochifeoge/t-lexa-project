import { Card, Input, Typography, Button } from "@material-tailwind/react";
import { FaEye, FaEyeSlash } from "react-icons/fa6";
import { Link, useNavigate } from "react-router-dom";
import { useRef, useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../components/Firebase";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const schema = yup.object().shape({
  email: yup
    .string()
    .email("please use a valid email")
    .required("email is required"),
  password: yup.string().required("type in password to login"),
});

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const [showPassword, setShowPassword] = useState(false);
  const toggleVissibility = (setterFn) => {
    setterFn((prev) => !prev);
  };

  /* const [email, setEmail] = useState("");
  const [password, setPassword] = useState(""); */

  const navigate = useNavigate();

  const loginBtnRef = useRef(null);

  const login = async (data) => {
    console.log(data);
    try {
      loginBtnRef.current.innerHTML = "Authenticating, Please Wait...";
      await signInWithEmailAndPassword(auth, data.email, data.password);
      toast.success("welcome back");
      navigate("/shop");
    } catch (error) {
      console.log(error.code);
      if (error.code === "auth/wrong-password") {
        toast.error("Incorrect password. Please try again.");
      } else if (error.code === "auth/user-not-found") {
        toast.error("No user found with this email.");
      } else if (error.code === "auth/invalid-credential") {
        toast.error("check your email and password");
      } else if (error.code === "auth/network-request-failed") {
        toast.error("please check your internet connection");
      } else {
        toast.error("An error occurred: " + error.message);
      }
    } finally {
      loginBtnRef.current.innerHTML = "Login";
    }
  };

  return (
    <section className="mx-auto max-w-[450px] p-12">
      <Card color="transparent" shadow={false}>
        <h3 className="text-3xl">Login </h3>
        <Typography color="gray" className="mt-1 font-normal">
          Welcome Back
        </Typography>

        <form className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96">
          <div className="mb-4 flex flex-col gap-6">
            <Typography variant="h6" color="blue-gray" className="-mb-3">
              Your Email
            </Typography>
            <div>
              <Input
                size="lg"
                placeholder="name@mail.com"
                className=" !border-t-blue-gray-200 focus:!border-blue-400"
                labelProps={{
                  className: "before:content-none after:content-none",
                }}
                {...register("email")}
              />
              {errors.email && (
                <p className="text-red-900 mt-1">{errors.email.message}</p>
              )}
            </div>
            <Typography variant="h6" color="blue-gray" className="-mb-3">
              Password
            </Typography>

            <div className="relative">
              <Input
                type={showPassword ? "text" : "password"}
                size="lg"
                placeholder="********"
                className=" !border-t-blue-gray-200 focus:!border-blue-400"
                labelProps={{
                  className: "before:content-none after:content-none",
                }}
                {...register("password")}
              />
              {errors.password && (
                <p className="text-red-900 mt-1">{errors.password.message}</p>
              )}
              {showPassword ? (
                <FaEye
                  onClick={() => toggleVissibility(setShowPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 cursor-pointer"
                />
              ) : (
                <FaEyeSlash
                  onClick={() => toggleVissibility(setShowPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 cursor-pointer"
                />
              )}
            </div>
          </div>

          <Button ref={loginBtnRef} onClick={handleSubmit(login)}>
            Login
          </Button>
          <Typography color="gray" className="mt-4  font-normal">
            Dont have an account ?
            <Link to="/registration" className="font-medium text-gray-900">
              Create an account
            </Link>
          </Typography>

          <Typography color="gray" className="mt-4  font-normal">
            Fogort password?
            <Link to="/registration" className="font-medium text-gray-900">
              Recover account
            </Link>
          </Typography>
        </form>
      </Card>
    </section>
  );
};

export default Login;
