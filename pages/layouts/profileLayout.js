import ProfileNavbar from "/app/ui/ProfileNavbar";
import Navbar from '/app/ui/Navbar';
import Footer from '/app/ui/Footer';

const profileLayout = ({children}) => {
    return (
        <>  
            <Navbar />
            <ProfileNavbar />
            <main>{children}</main>
            <Footer />
        </>
    )
}

export default profileLayout;