import {
  Card,
  Input,
  Checkbox,
  Button,
  Typography,
} from "@material-tailwind/react";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { FaEye, FaEyeSlash } from "react-icons/fa6";
import { auth, db } from "../components/Firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { toast } from "react-toastify";
import { doc, setDoc } from "firebase/firestore";

const Registration = () => {
  /////////////////////// toggle view password////////////////////////////////
  const [showPassword, setShowPassword] = useState(false);
  const passwordInput = document.querySelector(".password");

  const toggleVissibility = () => {
    setShowPassword((prev) => !prev);
    passwordInput.type === "password"
      ? (passwordInput.type = "text")
      : (passwordInput.type = "password");
  };

  //////////////// form validation logic /////////////////////////////

  const schema = yup.object().shape({
    fullName: yup
      .string("use a valid name")
      .required("your full name is required"),
    email: yup
      .string()
      .email("please use a valid email")
      .required("email is required"),
    password: yup
      .string("Password is required")
      .required()
      .min(5, "password must be at least 5 characters"),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref("password"), null], "password must match")
      .required("confirm that you can recall your password"),
    agreeToPolicy: yup
      .boolean()
      .oneOf([true], "Read and agree to policy")
      .required("Read and agree to policy"),
  });

  //////////////////react hook form///////////
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  /////////////////////// Registration logic /////////////////////////
  const navigate = useNavigate();

  const onSubmit = async (data, e) => {
    // data coming from handleSubmit (react hook form)
    e.preventDefault();
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );

      const user = userCredential.user;
      toast.success("Account Created");
      navigate("/shop");

      // Reference Firestore 'users' collection and create a document with user.uid
      const newUserRef = doc(db, "users", user.uid);

      const userData = {
        name: data.fullName,
        email: data.email,
        isVerified: true,
        role: "customer",
        createdAt: new Date(),
      };
      // Add data to Firestore
      await setDoc(newUserRef, userData);
    } catch (err) {
      console.error("Error creating user: ", err); // Log the error for better visibility
      toast.error("Error: " + err.message);
    }
  };

  return (
    <section className="mx-auto max-w-[450px] p-12">
      <Card color="transparent" shadow={false}>
        <h3 className="text-3xl">Sign Up </h3>
        <Typography color="gray" className="mt-1 font-normal">
          Create an account to process payments
        </Typography>
        <Typography color="gray" className="mt-4 text-center font-normal">
          Already have an account?{" "}
          <Link to="/login" className="font-medium text-gray-900">
            Sign In
          </Link>
        </Typography>
        <form className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96">
          <div className="mb-1 flex flex-col gap-6">
            <Typography variant="h6" color="blue-gray" className="-mb-3">
              Your Name
            </Typography>
            <Input
              size="lg"
              placeholder="Monday Tovia"
              {...register("fullName")}
              className=" !border-t-blue-gray-200 focus:!border-blue-400"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
            />
            {errors.fullName && (
              <p className="text-red-900 -mt-3">{errors.fullName.message}</p>
            )}
            <Typography variant="h6" color="blue-gray" className="-mb-3">
              Your Email
            </Typography>
            <Input
              size="lg"
              placeholder="name@mail.com"
              {...register("email")}
              className=" !border-t-blue-gray-200 focus:!border-blue-400"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
            />
            {errors.email && (
              <p className="text-red-900 -mt-3">{errors.email.message}</p>
            )}
            <Typography variant="h6" color="blue-gray" className="-mb-3">
              Password
            </Typography>

            <div className="relative">
              <Input
                type="password"
                size="lg"
                placeholder="********"
                {...register("password")}
                className="password !border-t-blue-gray-200 focus:!border-blue-400 w-full"
                labelProps={{
                  className: "before:content-none after:content-none",
                }}
              />
              {errors.password && (
                <p className="text-red-900 -mt-1">{errors.password.message}</p>
              )}
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
            <Typography variant="h6" color="blue-gray" className="-mb-3">
              Confirm Password
            </Typography>
            <div className="relative">
              <Input
                type="password"
                size="lg"
                placeholder="Confirm password"
                {...register("confirmPassword")}
                className="password !border-t-blue-gray-200 focus:!border-blue-400 w-full"
                labelProps={{
                  className: "before:content-none after:content-none",
                }}
              />
              {errors.confirmPassword && (
                <p className="text-red-900 -mt-1">
                  {" "}
                  {errors.confirmPassword.message}
                </p>
              )}
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
          <Checkbox
            {...register("agreeToPolicy")}
            label={
              <Typography
                variant="small"
                color="gray"
                className="flex items-center font-normal">
                I agree the
                <a
                  href="#"
                  className="font-medium transition-colors hover:text-gray-900">
                  &nbsp;Terms and Conditions
                </a>
              </Typography>
            }
            containerProps={{ className: "-ml-2.5" }}
          />
          {errors.agreeToPolicy && (
            <p className="text-red-900 -mt-0.5">
              {errors.agreeToPolicy.message}
            </p>
          )}

          <Button onClick={handleSubmit(onSubmit)} className="mt-6" fullWidth>
            Sign up
          </Button>

          <Button
            size="lg"
            variant="outlined"
            color="blue-gray"
            className="flex items-center gap-3 mt-3 w-full justify-center">
            <img
              src="https://docs.material-tailwind.com/icons/google.svg"
              alt="metamask"
              className="h-6 w-6"
            />
            Continue with Google
          </Button>
        </form>
      </Card>
    </section>
  );
};

export default Registration;
