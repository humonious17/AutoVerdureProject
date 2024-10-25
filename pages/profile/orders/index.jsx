import Reviewfom from "@/pages/Reviewfom";
import React from "react";

const Orders = (props) => {
  const orders = props.orders;
  return (
    <div className="py-[62px] md:pt-[132px] md:pb-[188px] xl:pt-[106px] xl:pb-[260px] 2xl:pb-[320px] px-4 md:px-[51px] xl:px-[216px] 2xl:px-[270px] flex flex-col gap-5 bg-[#FFFCF8]">
      <div className="mt-[30px] flex flex-col gap-y-5">
        {orders.map((order, index) => (
          <>
            <div
              className="w-full px-[19px] py-[21px] text-xs tracking-[0.24px] md:hidden flex flex-col tertiaryFont font-normal border-[1px] rounded-2xl border-black"
              key={index}
            >
              <div className="flex justify-between items-center">
                <div className="w-[120px] font-[600] text-[#151C28]">
                  <p>{order.productName}</p>
                </div>
                <div className="pr-[23px] text-[#585562]">
                  <p>paid</p>
                </div>
              </div>

              <div className="mt-4 flex justify-between items-center">
                <div className="text-[#585562]">
                  <p>{order.shippingAddress.city}</p>
                </div>
                <div
                  className={
                    order.orderStatus === "Delivered"
                      ? "px-4 py-2 rounded-[20px] w-fit bg-secondarySuccessAlerts bg-opacity-10 text-secondarySuccessAlerts"
                      : "px-4 py-2 rounded-[20px] w-fit bg-[#FFF5EB] text-[#FB7E15]"
                  }
                >
                  <p>{order.orderStatus}</p>
                </div>
              </div>
            </div>
          </>
        ))}
      </div>

      <table rules="all">
        <thead className="w-full px-[25px] mt-[30px] hidden md:flex flex-col gap-5">
          <tr className="justify-start items-start inline-flex flex justify-between items-center px-[35px]">
            {/* <div classname="w-[946px] h-[18px] justify-start items-start gap-[120px] inline-flex"> */}
              <td className="w-[160px] text-gray-900 text-xs font-normal font-['Poppins'] tracking-tight">Product</td>
              <td className="w-[80px] text-gray-900 text-xs font-normal font-['Poppins'] tracking-tight">Address</td>
              <td className="w-[70px] text-gray-900 text-xs font-normal font-['Poppins'] tracking-tight">Order Type</td>
              <td className="w-[90px] text-gray-900 text-xs font-normal font-['Poppins'] tracking-tight">Payment</td>
              <td className="w-[145px] text-gray-900 text-xs font-normal font-['Poppins'] tracking-tight">Delivery Status</td>
              <td className="w-[70px] text-gray-900 text-xs font-normal font-['Poppins'] tracking-tight">Time</td>
            {/* </div> */}
          </tr>
        </thead>

        <tbody className="mt-[30px] hidden md:flex flex-col gap-5">
          {orders.map((order, index) => (
            <tr
              key={index}
              className="px-[35px] py-[38px] text-xs w-full border-[1px] border-black rounded-2xl bg-white flex justify-between items-center"
            >
              <td className="w-[150px]">{order.orderedProducts[0].productName + ((order.orderedProducts.length == 1) ? '' : `+ ${order.orderedProducts.length - 1} more`)}</td>

              <td>{order.shippingAddress.city}</td>

              <td>Product</td>

              <td>Paid</td>

              <td
                className={
                  order.orderStatus === "Delivered"
                    ? "px-4 py-2 rounded-[20px] w-[130px] flex justify-center items-center bg-secondarySuccessAlerts bg-opacity-10 text-secondarySuccessAlerts"
                    : "px-4 py-2 rounded-[20px] w-[130px] flex justify-center items-center bg-[#FFF5EB] text-[#FB7E15]"
                }
              >
                {order.orderStatus}
              </td>

              <td width={"100px"}>{order.orderTime}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="mt-10 sm:mt-[80.99px] xl:mt-[59.99px] w-full h-full flex justify-center items-center"><Reviewfom/></div>
      
    </div>
  );
};

export async function getServerSideProps({req, res}) {
  const currentUser = (await import("@/lib/server/currentUser")).default;
  const findAllOrders = (await import("@/pages/api/orders/findAllOrders")).default

  const user = await currentUser(req);

  if (user) {
    const orders = await findAllOrders(user.email);
    return {
      props: {
        orders: orders
      }
    }
  } else {
    return {
      props: {
        orders: []
      }
    }
  }
}

export default Orders;
