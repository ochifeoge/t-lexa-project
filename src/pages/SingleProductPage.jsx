import { Select, Option } from "@material-tailwind/react";
import Button from "../components/Button";
import InputAmountButton from "../components/InputAmountButton";
import { useLoaderData } from "react-router-dom";

const SingleProductPage = () => {
  const product = useLoaderData();
  return (
    <section className="max-container flex flex-col md:flex-row items-center justify-center">
      <div className="flex flex-col items-center gap-5 lg:w-1/2">
        <div className="w-[300px]">
          <img
            className="object-cover"
            src={product.image}
            alt={product.name}
          />
        </div>

        {/*  <div className="flex gap-3 justify-center items-center">
          <img
            className="cursor-pointer"
            width={70}
            height={70}
            src="https://images.pexels.com/photos/6214471/pexels-photo-6214471.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            alt=""
          />
          <img
            width={70}
            height={70}
            src="https://images.pexels.com/photos/6214471/pexels-photo-6214471.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            alt=""
          />
          <img
            width={70}
            height={70}
            src="https://images.pexels.com/photos/6214471/pexels-photo-6214471.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            alt=""
          />
        </div> */}
      </div>

      <div className="lg:w-[45%]">
        <div className="flex flex-col items-center lg:items-start gap-4 my-5">
          <h3 className="text-lg">{product.categories}</h3>
          <h1 className="font-bold text-4xl">
            <span>&#8358;</span>
            {product.price}
          </h1>
        </div>

        <div className="w-4/6">
          {/*     <Select color="blue" className="w-full " label="Select Size">
            <Option>S</Option>
            <Option>L</Option>
            <Option>XL</Option>
            <Option>XXL</Option>
            <Option>3XL</Option>
          </Select> */}
        </div>

        <div className="flex flex-col md:flex-row items-center">
          <InputAmountButton
            product={product}
            label={"  Select Amount"}
            desc=" Adjust the amount using the + and - controls."
          />
          <Button label="Add to cart" />
        </div>
        <div className="my-5">
          <h3 className="text-xl">Product Detals</h3>

          <p className="">{product.description}</p>
        </div>
      </div>
    </section>
  );
};

export default SingleProductPage;
