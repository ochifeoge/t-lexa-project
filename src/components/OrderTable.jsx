import { Card, Typography } from "@material-tailwind/react";

const TABLE_HEAD = ["Product Name", "Quantity", "Price"];

/* const TABLE_ROWS = [
  {
    name: "Ultra HD TV6",
    category: "Electronics",
    quantity: "1",
    price: "$999.99",
  },
  {
    name: "Wireless Headphones",
    category: "Audio",
    quantity: "2",
    price: "$199.99",
  },
  {
    name: "Coffee Maker",
    category: "Kitchen",
    quantity: "1",
    price: "$79.99",
  },
  {
    name: "Running Shoes",
    category: "Sportswear",
    quantity: "1",
    price: "$129.99",
  },
]; */

function OrderTable({ data }) {
  const total = data?.reduce(
    (totalAmount, currentItem) =>
      totalAmount + currentItem.price * currentItem.quantity,
    0
  );
  const totalQuantity = data?.reduce(
    (totalAmount, currentItem) => totalAmount + currentItem.quantity,
    0
  );
  return (
    <Card className="h-full w-full overflow-scroll">
      <table className="w-full min-w-max table-auto text-left">
        <thead>
          <tr>
            {TABLE_HEAD.map((head) => (
              <th key={head} className="p-4 pt-10">
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-bold leading-none">
                  {head}
                </Typography>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data?.map(({ name, product_img, quantity, price }) => {
            return (
              <tr key={name}>
                <td className="p-4 flex items-center gap-5">
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-bold">
                    {name}
                  </Typography>
                  <img
                    src={product_img}
                    alt={name}
                    className="w-12 h-12 rounded-full justify-self-end"
                  />
                </td>
                {/*  <td className="p-4">
                  <Typography
                    variant="small"
                    className="font-normal text-gray-600">
                    {category}
                  </Typography>
                </td> */}
                <td className="p-4">
                  <Typography
                    variant="small"
                    className="font-normal text-gray-600">
                    {quantity}
                  </Typography>
                </td>
                <td className="p-4">
                  <Typography
                    variant="small"
                    className="font-normal text-gray-600">
                    {price}
                  </Typography>
                </td>
              </tr>
            );
          })}
        </tbody>
        <tfoot className="border-t border-gray-300">
          <tr>
            <td className="p-4">
              <Typography
                color="blue-gray"
                variant="small"
                className="font-bold">
                Total
              </Typography>
            </td>

            <td className="p-4">
              <Typography
                color="blue-gray"
                variant="small"
                className="font-bold">
                {totalQuantity}
              </Typography>
            </td>
            <td className="p-4">
              <Typography
                color="blue-gray"
                variant="small"
                className="font-bold">
                N {total}
              </Typography>
            </td>
          </tr>
        </tfoot>
      </table>
    </Card>
  );
}

export default OrderTable;
