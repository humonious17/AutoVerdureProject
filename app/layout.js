import "./globals.css";
import Footer from "./ui/Footer";
import Navbar from "./ui/Navbar";

export const metadata = {
  title: "Auto Verdure",
  description: "An E-commerce application for plants and pots",
};

export default function RootLayout({ children }) {
    
  return (
    <html lang="en">
        <head>
        </head>
      <body className="bg-[#FFFBF7]">
        <Navbar />
        {children}
              <Footer />
      </body>
    </html>
  );
}
