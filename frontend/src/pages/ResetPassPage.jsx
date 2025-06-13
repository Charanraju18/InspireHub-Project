import Breadcrumb from "../components/Breadcrumb";
import FooterOne from "../components/FooterOne";
import HeaderOne from "../components/HeaderOne";
import ResetPassComp from "../components/ResetPassComp";
import Animation from "../helper/Animation";
import Preloader from "../helper/Preloader";

const ResetPassPage = () => {
  return (
    <>
      {/* Preloader */}
      <Preloader />

      {/* Animation */}
      <Animation />

      {/* HeaderOne */}
      <HeaderOne />

      {/* Breadcrumb */}
      <Breadcrumb title={"Reset Password"} />

      {/* ResetPassComp */}
      <ResetPassComp />

      {/* FooterOne */}
      <FooterOne />
    </>
  );
};

export default ResetPassPage;
