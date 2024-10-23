'use client';
import '/app/globals.css'; // Import global styles
import Navbar from '/app/ui/Navbar';
import Footer from '/app/ui/Footer';
import { useEffect } from 'react';

const generalLayout = ({ children }) => {
    return (
        <>
            <Navbar />
            <main>{children}</main>
            <Footer />
        </>
    );
}

export default generalLayout;