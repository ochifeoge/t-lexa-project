import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Tooltip,
} from "@material-tailwind/react";
import { tovia } from "./details";
import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa6";

const ProfileCard = () => {
  return (
    <Card className="w-96 mx-auto bg-slate-100 py-5 px-2 shadow-2xl">
      <CardHeader floated={false} className="h-80  ">
        <img
          src={tovia}
          alt="profile picture of founder"
          className="w-full  rounded-xl"
        />
      </CardHeader>
      <CardBody className="text-center">
        <h4 className="mb-2 text-gray-950 text-3xl font-semibold">
          Monday Tovia
        </h4>
        <h4 className="font-medium mb-2 text-gray-950 text-2xl " textGradient>
          Founder
        </h4>
      </CardBody>
      <CardFooter className="flex justify-center gap-7 pt-2">
        <Tooltip content="Like">
          <a href="#facebook" className="text-blue-500 text-xl" textGradient>
            <FaFacebook />
          </a>
        </Tooltip>
        <Tooltip content="Follow">
          <Typography
            as="a"
            href="#twitter"
            className="text-blue-500 text-xl"
            textGradient>
            <FaTwitter />
          </Typography>
        </Tooltip>
        <Tooltip content="Follow">
          <Typography
            as="a"
            href="#instagram"
            className="text-purple-500 text-lg"
            textGradient>
            <FaInstagram />
          </Typography>
        </Tooltip>
      </CardFooter>
    </Card>
  );
};

export default ProfileCard;
