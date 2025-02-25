import Quick from "../components/Home/Quick Access/Quick";
import HeroSection from "../components/Home/02_Header/Header_section.jsx";
import AcedmicProg from "../components/Home/Academic Programs/AcedmicProg";
import Campus from "../components/Home/Campus Life/Campus.jsx";
import Navbar from "../components/Home/01_Nav/Navbar.jsx";
import AlumniNetwork from "../components/Home/Alumni Network/AlumniNetwork.jsx";
import Footer from "../components/Home/Footer/Footer.jsx"
import Contact from "../components/Home/Contact Us/Contact.jsx";
function Home() {

    return (
        <div className="w-screen h-screen overflow-x-hidden">
            <div className="sticky top-0 z-50">
                <Navbar></Navbar>
            </div>
            <HeroSection></HeroSection>
            <Quick></Quick>
            <AcedmicProg></AcedmicProg>
            <Campus></Campus>
            <AlumniNetwork></AlumniNetwork>
            {/* style="visibility: visible;
                style="animation-delay: 0.2s; visibility: visible;
                style="animation-delay: 0.4s; visibility: visible;
                style="animation-delay: 0.6s; visibility: visible;
            */}
            <Contact></Contact>
            <Footer></Footer>
        </div>
    )
}
export default Home;
