import { FaArrowDown, FaArrowUp, FaTrafficLight } from "react-icons/fa";
import { BiUndo } from "react-icons/bi";
import { MdStore } from "react-icons/md";
import BarChart from "./Graphs/BarChart";
import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../components/Firebase";
import { Tooltip } from "@material-tailwind/react";

const AdminHero = () => {
  const [orders, setOrders] = useState([]);
  useEffect(() => {
    document.title = "Admin Dashboard - Ecommerce";

    const fetchOrders = async () => {
      const orderSnapshot = await getDocs(collection(db, "orders"));
      const data = orderSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setOrders(data);
    };
    fetchOrders();
  }, []);
  return (
    <div className="grid grid-cols-12 gap-5 p-5 h-screen">
      {/* Statistics Cards */}
      {[
        {
          label: "Orders",
          value: 128,
          icon: <MdStore size={30} />,
          metric: -23,
        },
        {
          label: "Revenue",
          value: "$5,432",
          icon: <MdStore size={30} />,
          metric: 60,
        },
        {
          label: "Product Returns",
          value: "8",
          icon: <BiUndo size={30} />,
          metric: -2, // % change in return rate
        },
        {
          label: "Traffic",
          value: 15000, // Visitors in a set time period
          icon: <FaTrafficLight size={30} />,
          metric: 10, // % change in traffic
        },
      ].map((stat, index) => (
        <div
          key={index}
          className="col-span-6 lg:col-span-3  shadow rounded-lg bg-white p-5">
          <div className="flex gap-1 items-center">
            <p className="text-gray-500">{stat.label}</p>
            <Tooltip content="tool">i</Tooltip>
          </div>
          <div className="flex items-end  gap-3">
            <h2 className="text-4xl text-gray-800  ">{stat.value}</h2>

            <div className="flex items-center gap-1">
              <div
                className={`${
                  stat.metric > 0 ? "text-green-500" : "text-red-500"
                }`}>
                {stat.metric > 0 ? <FaArrowUp /> : <FaArrowDown />}
              </div>
              <p
                className={` text-sm font-extrabold   ${
                  stat.metric > 0 ? "text-green-500" : "text-red-500"
                }`}>
                {stat.metric}%
              </p>
            </div>
          </div>
        </div>
      ))}

      {/* Bar Chart */}
      <div className="col-span-12 md:col-span-6 lg:col-span-7 min-h-[50dvh] rounded-lg shadow-lg bg-white p-5">
        <h3 className="text-lg font-semibold mb-4">Sales Overview</h3>
        <BarChart />
      </div>

      {/* Recent Transactions */}
      <div className="col-span-12 md:col-span-6 lg:col-span-5 rounded-lg shadow-lg bg-white p-5">
        <h3 className="text-lg font-semibold mb-4">Recent Transactions</h3>
        <div className="space-y-3 h-96 overflow-auto">
          {
            /* [
            {
              name: "John Doe",
              phone: "0903452231",
              date: "2024-01-12",
              amount: 3402,
            },
            {
              name: "Jane Smith",
              phone: "0801234567",
              date: "2024-01-10",
              amount: 2000,
            },
            {
              name: "Mike Johnson",
              phone: "0709876543",
              date: "2024-01-08",
              amount: 1500,
            },
          ] */ orders?.map((transaction, index) => (
              <div
                key={index}
                className="flex items-center justify-between bg-gray-50 p-3 rounded-md shadow-sm">
                <div>
                  <h5 className="text-sm font-medium text-gray-700">
                    {transaction.customer.name}
                  </h5>
                  <a
                    href={`tel:${transaction.customer.phone_number}`}
                    className="text-xs text-gray-500">
                    {" "}
                    {transaction.customer.phone_number}
                  </a>
                </div>
                <small className="text-xs text-gray-400">
                  {transaction.date || "now-test"}
                </small>
                <h5 className="text-sm font-medium text-gray-700">
                  {transaction.status}
                </h5>
                <div className="text-sm font-semibold py-1 px-3 text-green-500 bg-gray-100 rounded-md">
                  ${transaction.amount_payed}
                </div>
              </div>
            ))
          }
        </div>
      </div>
    </div>
  );
};

export default AdminHero;
