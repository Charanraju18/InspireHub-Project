import Breadcrumb from "../components/Breadcrumb";
import CertificateOne from "../components/CertificateOne";
import RoadmapForm from "../components/RoadmapForm";
import FooterOne from "../components/FooterOne";
import HeaderOne from "../components/HeaderOne";
import Animation from "../helper/Animation";
import Preloader from "../helper/Preloader";

const CreateRoadMap = () => {
  return (
    <>
      {/* Preloader */}
      <Preloader />

      {/* Animation */}
      <Animation />

      {/* HeaderTwo */}
      <HeaderOne />

      {/* Breadcrumb */}
      {/* <Breadcrumb title={"Create Event"} /> */}

      {/* Roadmap */}
      <RoadmapForm />

      {/* CertificateOne */}
      <CertificateOne />

      {/* FooterOne */}
      <FooterOne />
    </>
  );
};

export default CreateRoadMap;
