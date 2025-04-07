import { DataGrid } from "@mui/x-data-grid";
import Paper from "@mui/material/Paper";
import { Button } from "@material-tailwind/react";
import { CartState } from "../components/Context";
import useDeleteProduct from "./utils/useDeleteProduct";
import { toast } from "react-toastify";

const ManageProducts = () => {
  const { products, refetch, setViewProduct, setActiveSection } = CartState();

  // Use the custom delete mutation hook
  const deleteMutation = useDeleteProduct();

  const handleDelete = (productId) => {
    const confirm = window.confirm(
      "are you sure you want to delete this product?"
    );

    if (!confirm) {
      return;
    } else {
      try {
        deleteMutation.mutateAsync(productId);
        refetch();
        toast.success("product deleted successfully");
      } catch (error) {
        console.log(error);
        toast.error("failed to delete this file");
      }
    }
  };

  // handle view pop up

  const handleViewProduct = (productId) => {
    setActiveSection("viewproduct");
    const viewProduct = products.find((product) => product.id === productId);
    setViewProduct(viewProduct);
  };

  // function for editing the products
  /*  const handleEdit = (productId) => {
    console.log("editing product with id:", productId);
  }; */
  const columns = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "name", headerName: "Name", width: 130 },
    { field: "price", headerName: "Price", width: 130 },
    {
      field: "description",
      headerName: "Description",
      width: 150,
    },
    {
      field: "quantity",
      headerName: "Quantity",
      type: "number",
      width: 90,
    },
    {
      field: "categories",
      headerName: "Category",
      description: "This column has a value getter and is not sortable.",
      sortable: false,
      width: 160,
    },
    {
      field: "images",
      headerName: "images",
      sortable: false,
      renderCell: (params) => (
        <a href={params.row.images} target="_blank">
          <img
            src={params.row.images}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              borderRadius: "4px",
            }}
          />
        </a>
      ),
    },
    {
      field: "view",
      headerName: "view products",
      description:
        "clicking the buttons will allow you to edit the selected products",
      renderCell: (params) => (
        <button
          onClick={() => handleViewProduct(params.row.id)}
          style={{
            padding: "3px 10px",
            backgroundColor: "skyblue",
            color: "white",
            border: "none",
            borderRadius: "10px",
            cursor: "pointer",
          }}>
          View
        </button>
      ),
      sortable: false,
    },
    {
      field: "delete",
      headerName: "DELETE",
      description: "clicking this will delete products from your app",
      renderCell: (params) => (
        <button
          onClick={() => handleDelete(params.row.id)}
          style={{
            padding: "3px 10px",
            backgroundColor: "red",
            color: "white",
            border: "none",
            borderRadius: "10px",
            cursor: "pointer",
          }}>
          Delete
        </button>
      ),
      sortable: false,
    },
  ];

  const rows = products.map((product) => ({
    id: product.id,
    name: product.name,
    images: product.images[0],
    description: product.description,
    categories: product.categories,
    quantity: product.quantity,
    price: product.price,
  }));

  const paginationModel = { page: 0, pageSize: 10 };
  return (
    <div>
      <Paper sx={{ height: "85vh", width: "100vw", overflowX: "auto" }}>
        <DataGrid
          rows={rows}
          columns={columns}
          initialState={{ pagination: { paginationModel } }}
          pageSizeOptions={[5, 10]}
          checkboxSelection
          sx={{ border: 0 }}
        />
      </Paper>
      {/* receiving the setactive section as props so i can change the main display  */}

      <Button onClick={() => setActiveSection("addproducts")}>
        Add Products
      </Button>
    </div>
  );
};

export default ManageProducts;
