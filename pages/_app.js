'use client';
import '/app/globals.css'; // Import global styles
import { useEffect, useState } from 'react';
import generalLayout from '@/pages/layouts/generalLayout';
import profileLayout from '@/pages/layouts/profileLayout';
import adminLayout from '@/pages/layouts/adminLayout';
import checkoutLayout from '@/pages/layouts/checkoutLayout';
import { useRouter } from 'next/router';
import App from 'next/app';

function MyApp({ Component, pageProps }) {
    const [isClient, setIsClient] = useState(false);
    const router = useRouter();
    const pathname = router.pathname;
    let Layout;

    // Ensure that certain client-side features are used only on the client
    useEffect(() => {
        setIsClient(true);  // Once mounted, this ensures the app runs only on the client
        document.body.classList.add('bg-[#FFFBF7]');
        return () => {
            document.body.classList.remove('bg-[#FFFBF7]');
        };
    }, []);

    if (pathname.startsWith('/profile')) {
        Layout = profileLayout;
    } else if (pathname.startsWith('/admin')) {
        Layout = adminLayout;
    } else if (pathname.startsWith('/checkout')) {
        Layout = checkoutLayout;
    } else {
        Layout = generalLayout;
    }

    return (
        // Removed Provider and PersistGate for Redux
        <Layout>
            <Component {...pageProps} />
        </Layout>
    );
}

MyApp.getInitialProps = async (appContext) => {
    const appProps = await App.getInitialProps(appContext);
  
    return {
        ...appProps
    };
};

export default MyApp;
