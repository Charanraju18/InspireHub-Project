import Breadcrumb from "../components/Breadcrumb";
import FooterOne from "../components/FooterOne";
import HeaderOne from "../components/HeaderOne";
import ForgotPassComp from "../components/ForgotPassComp";
import Animation from "../helper/Animation";
import Preloader from "../helper/Preloader";

const ForgotPassPage = () => {
  return (
    <>
      {/* Preloader */}
      <Preloader />

      {/* Animation */}
      <Animation />

      {/* HeaderOne */}
      <HeaderOne />

      {/* Breadcrumb */}
      <Breadcrumb title={"Forgot Password"} />

      {/* ForgotPassComp */}
      <ForgotPassComp />

      {/* FooterOne */}
      <FooterOne />
    </>
  );
};

export default ForgotPassPage;
