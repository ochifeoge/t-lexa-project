import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
} from "@material-tailwind/react";
import { Link, useParams } from "react-router-dom";
import Button from "./Button";

import { FaCartShopping } from "react-icons/fa6";

/* description = " With plenty of talk and listen time, voice-activated Siri access, and an available wireless charging case.", */

export function EcommerceCard({ product }) {
  return (
    <Card className="w-full p-2">
      <Link to={`/products/${product.id}`}>
        <CardHeader shadow={true} floated={false} className="h-64">
          <img
            src={product.image}
            alt={product.name}
            className={`h-full w-full object-cover rounded-md`}
            style={{
              objectPosition: "center",
            }}
          />
        </CardHeader>
      </Link>
      <CardBody className="md:p-2 ">
        <div className="mb-2 flex flex-col gap-2 md:gap-0 md:flex-row md:items-center md:justify-between">
          <Typography color="blue-gray" className="font-medium">
            {product.name}
          </Typography>
          <Typography
            color="blue-gray"
            className="font-medium flex items-center gap-1">
            <span>&#8358;</span> {product.price}
          </Typography>
        </div>
      </CardBody>
      <CardFooter className="pt-1 px-2 ">
        <Button label="Add TO Cart" product={product} />
      </CardFooter>
    </Card>
  );
}
