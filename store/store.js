// Create a simple store without Redux
const store = {
  products: [],
  user: null,
  // Add any other state variables needed
};

// Function to update store state
const setStoreState = (newState) => {
  Object.assign(store, newState);
};

// Function to get store state
const getStoreState = () => {
  return { ...store };
};

// Export the store along with setter and getter functions
export { store, setStoreState, getStoreState };
