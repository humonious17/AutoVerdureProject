import AdminNavbar from "/app/ui/AdminNavBar";

const Layout = ({ children }) => {
  return (
    <>
      <script
          type="module"
          defer
          src="https://cdn.jsdelivr.net/npm/ldrs/dist/auto/newtonsCradle.js"
        ></script>
      <AdminNavbar />
          <main>{children}</main>
    </>
  );
};

export default Layout;