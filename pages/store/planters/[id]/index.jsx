import SingleProductPage from "@/app/ui/Store/SingleProductPage";
import findProduct from "/pages/api/products/findProduct";
import findAllProducts from "/pages/api/products/findAllProducts";
import React from "react";

const SinglePlantersPage = (props) => {
    const productData = props.product;
    const allProducts = props.allProducts;
  return (
    <div className="w-full flex justify-center items-center overflow-hidden bg-[#FFFBF7]">
      <SingleProductPage productData={productData} allProducts={allProducts} />
    </div>
  );
};

export async function getServerSideProps(context) {
    const { id } = context.params;
    
    const product = await findProduct(id, 'planters');
    const allProducts = await findAllProducts('planters');
    
    if (!product && !allProducts) {
        return {
            redirect: {
                destination: '/store',
                permanent: false,
            },
        }
    }
    
    return {
        props: {
            product: product,
            allProducts: allProducts
        }
    }
}

export default SinglePlantersPage;
