import {
  Card,
  Input,
  Checkbox,
  Typography,
  Button,
} from "@material-tailwind/react";
import { FaEye, FaEyeSlash } from "react-icons/fa6";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../components/Firebase";
import { toast } from "react-toastify";


const Login = () => {
  const [showPassword, setShowPassword] = useState(false);

  const passwordInput = document.querySelector(".password");

  const toggleVissibility = (e) => {
    setShowPassword((prev) => !prev);
    passwordInput.type === "password"
      ? (passwordInput.type = "text")
      : (passwordInput.type = "password");
  };

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const login = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      toast.success("welcome back");
      navigate("/shop");
    } catch (error) {
      if (error.code === "auth/wrong-password") {
        toast.error("Incorrect password. Please try again.");
      } else if (error.code === "auth/user-not-found") {
        toast.error("No user found with this email.");
      } else if (error.code === "auth/invalid-credential") {
        toast.error("check your email and password");
      } else {
        toast.error("An error occurred: " + error.message);
      }
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
          <div className="mb-1 flex flex-col gap-6">
            <Typography variant="h6" color="blue-gray" className="-mb-3">
              Your Email
            </Typography>
            <Input
              size="lg"
              placeholder="name@mail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className=" outline-sky-300 focus:ring-sky-600"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
            />
            <Typography variant="h6" color="blue-gray" className="-mb-3">
              Password
            </Typography>

            <div className="relative">
              <Input
                type="password"
                size="lg"
                placeholder="********"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="password outline-sky-300 focus:ring-sky-600 w-full"
                labelProps={{
                  className: "before:content-none after:content-none",
                }}
              />
              {showPassword ? (
                <FaEye
                  onClick={toggleVissibility}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 cursor-pointer"
                />
              ) : (
                <FaEyeSlash
                  onClick={toggleVissibility}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 cursor-pointer"
                />
              )}
            </div>
          </div>

          <Button onClick={login}>Login</Button>
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
