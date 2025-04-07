import { closePaymentModal, FlutterWaveButton } from "flutterwave-react-v3";
import { CartState } from "./Context";

import { db } from "./Firebase";
import { doc, setDoc, updateDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const FlutterWavePayment = () => {
  const { state, dispatch, userDetails } = CartState();
  const user = state.user;
  const navigate = useNavigate();

  const currentOrders = userDetails.successfulOrders || [];
  const cart = state.cart;
  const amountToPay = cart.reduce(
    (totalAmount, cartItem) => totalAmount + cartItem.price * cartItem.qty,
    0
  );

  const config = {
    public_key: import.meta.env.VITE_FLUTTERWAVE_PUBLIC_KEY,
    tx_ref: Date.now(),
    amount: amountToPay,
    currency: "NGN",
    payment_options: "card,mobilemoney,ussd",
    customer: {
      email: userDetails.email,
      phone_number: userDetails.phoneNumber,
      name: userDetails.name,
    },
    customizations: {
      title: "T-lexa's store",
      description: "Payment for items in cart",
      logo: "https://st2.depositphotos.com/4403291/7418/v/450/depositphotos_74189661-stock-illustration-online-shop-log.jpg",
    },
  };

  const fwConfig = {
    ...config,
    text: "Pay with Flutterwave!",
    callback: async (response) => {
      if (response.status === "completed" && user.uid) {
        const orderRef = doc(
          db,
          "orders",
          `${response.transaction_id}-${user.uid}`
        );
        const date = new Date();
        const formattedDate = `{${date.getFullYear()}-${(date.getMonth() + 1)
          .toString()
          .padStart(2, "0")}-${date.getDate().toString().padStart(2, "0")}}`;

        const order = {
          order_id: response.tx_ref,
          transaction_Id: response.transaction_id,
          amount_payed: response.amount,
          status: response.status,
          date: formattedDate,
          payment_details: {
            flw_ref: response.flw_ref,
          },
          customer: {
            email: userDetails.email,
            phone_number: userDetails.phoneNumber,
            name: userDetails.name,
          },
          products: cart.map((item) => ({
            product_id: item.id,
            product_img: item.images[0],
            name: item.name,
            quantity: item.qty,
            price: item.price,
            selectedColor: item.selectedColor,
            selectedSize: item.selectedSize,
          })),

          user_id: user.uid,
        };
        try {
          console.log(order);
          await setDoc(orderRef, order);

          const userRef = doc(db, "users", user.uid);
          currentOrders.push({
            orderId: order.order_id,
            orderDate: order.date,
            products: order.products,
          });

          await updateDoc(userRef, { successfulOrders: currentOrders });
          dispatch({
            type: "EMPTY_CART",
          });

          navigate("/shop");
          toast.success("Payment successful! Order saved.");
        } catch (error) {
          console.error("Failed to save order:", error);
          console.error("error message:", error.message);
          alert("Payment successful, but order not saved. Contact support.");
        }
      } else {
        alert("Payment failed. Please try again.");
      }

      closePaymentModal();
    },
    onClose: () => {
      console.log("closed");
      closePaymentModal();
    },
  };

  return (
    <div className="bg-green-500 w-max mx-auto px-3 cursor-pointer text-center py-2 text-xl rounded font-bold text-white">
      <FlutterWaveButton {...fwConfig} />
    </div>
  );
};

export default FlutterWavePayment;
