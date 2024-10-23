// Initial state for the product management
let selectedProducts = [];

// Function to add a product to the selected products list
const addProduct = (product) => {
  selectedProducts.push(product);
};

// Function to set the selected products list with new products
const setProducts = (products) => {
  selectedProducts = products;
};

// Function to clear the selected products list
const clearProducts = () => {
  selectedProducts = [];
};

// Function to get the current selected products
const getSelectedProducts = () => {
  return selectedProducts;
};

// Exporting functions for use in components
export { addProduct, setProducts, clearProducts, getSelectedProducts };
