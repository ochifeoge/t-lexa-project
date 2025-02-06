import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteProduct } from "./deleteFIle";

const useDeleteProduct = () => {
  const queryClient = useQueryClient();
  return useMutation(
    async (productId) => {
      await deleteProduct(productId);
    },
    {
      // What to do when delete succeeds
      onSuccess: () => {
        queryClient.invalidateQueries(["products"]); // Refresh the products list
      },
    }
  );
};

export default useDeleteProduct;
