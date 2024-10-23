import CheckoutNavbar from "@/app/ui/Cart/CheckoutNavbar";

const Layout = ({ children }) => {
  return (
    <>
        <div>
        <CheckoutNavbar />
        <main>{children}</main>
        </div>
    </>
  );
};

export default Layout;