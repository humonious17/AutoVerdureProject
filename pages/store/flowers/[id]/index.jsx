import SingleProductPage from "@/app/ui/Store/SingleProductPage";
import findProduct from "/pages/api/products/findProduct";
import findAllProducts from "/pages/api/products/findAllProducts";
import React from "react";

const SingleFlowersPage = (props) => {
    const productData = props.product;
    const allProducts = props.allProducts;
    return (
      <div className="w-full flex justify-center items-center overflow-hidden bg-[#FFFBF7]">
        <SingleProductPage
          productData={productData}
          allProducts={allProducts}
        />
      </div>
    );
};

export async function getServerSideProps(context) {
    const { id } = context.params;

    const product = await findProduct(id, 'flowers');
    const allProducts = await findAllProducts('flowers');

    if (!product || !allProducts) {
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

export default SingleFlowersPage;
