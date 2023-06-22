import FeaturesSection from "../components/all-other/featuressection";
import Header from "@/components/all-other/header";
// import Navbar from "@/components/navbar/navbar";
// import Footer from "@/components/all-other/footer";
// import Underfooter from "@/components/all-other/underfooter";
import Newsteller from "@/components/all-other/newsteller";
import Promotion from "@/components/all-other/promotions";
import Swipper from "@/components/all-other/swipper";
export default function Home() {
  return (
    <>
      <div className="bg-white w-auto h-auto">
        {/* <Navbar /> */}
        <Header />
        <Promotion />
        <Swipper />
        <FeaturesSection />
        <Newsteller />
        {/* <Footer />
        <Underfooter /> */}
      </div>
    </>
  );
}
