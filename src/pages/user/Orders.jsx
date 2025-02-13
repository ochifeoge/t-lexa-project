import { useState } from "react";
import OrderTable from "../../components/OrderTable";
import { CartState } from "../../components/Context";
import Spinners from "../../components/Spinners";
import { FaFileDownload } from "react-icons/fa";
import { Tooltip } from "@material-tailwind/react";

const Orders = () => {
  const [loading] = useState(true);
  const { userDetails } = CartState();

  /*  if (userDetails && userDetails.length) {
    console.log("present");
  } */

  return (
    <>
      <div className="w-full max-w-[900px] mx-auto mb-8 p-2 md:p-5">
        <h1 className="text-4xl font-bold mb-5">Your Order Histroy</h1>

        {!userDetails ? (
          <Spinners loading={loading} />
        ) : (
          userDetails.successfulOrders?.map((order) => (
            <div
              className="lg:border-[0.5px] rounded lg:border-blue-gray-100  p-2  md:p-5"
              key={order?.orderId}>
              <span>
                <Tooltip content="download receipt" placement="top">
                  <FaFileDownload
                    className=" text-green-400 cursor-pointer"
                    size={28}
                  />
                </Tooltip>
              </span>

              <div className="flex items-center justify-between">
                <h3 className="ml-2">order date : {order?.orderDate}</h3>
                <h3 className="mr-2">order ID: {order?.orderId}</h3>
              </div>
              <OrderTable data={order?.products} />
            </div>
          ))
        )}
      </div>
    </>
  );
};

export default Orders;
