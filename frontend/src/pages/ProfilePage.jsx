import React, { useEffect, useState } from "react";
import Breadcrumb from "../components/Breadcrumb";
import FooterOne from "../components/FooterOne";
import HeaderOne from "../components/HeaderOne";
import axios from "axios";
import { useAuth } from "../authContext";

const ProfilePage = () => {
  const { user: authUser } = useAuth();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [activeTab, setActiveTab] = useState("personal");

  useEffect(() => {
    const fetchProfile = async () => {
      setLoading(true);
      setError("");
      try {
        let token = localStorage.getItem("token");
        if ((!token || token === "undefined" || token === "null") && authUser && (authUser.token || authUser.accessToken)) {
          token = authUser.token || authUser.accessToken;
          if (token) localStorage.setItem("token", token);
        }
        if (!token || token === "undefined" || token === "null") {
          setError("No authentication token found. Please sign in again.");
          setLoading(false);
          return;
        }
        const res = await axios.get("http://localhost:5000/api/auth/profile", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser(res.data);
      } catch (err) {
        if (err.response && err.response.data && err.response.data.message) {
          setError(err.response.data.message);
        } else {
          setError("Failed to load profile. Please try again.");
        }
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, [authUser]);

  if (loading) return <div className="text-center py-5">Loading profile...</div>;
  if (error) return <div className="text-center py-5 text-danger">{error}</div>;
  if (!user) return <div className="text-center py-5">No profile data found.</div>;

  const socialIcons = {
    linkedin: "ph-bold ph-linkedin-logo",
    github: "ph-bold ph-github-logo",
    twitter: "ph-bold ph-twitter-logo",
    portfolio: "ph-bold ph-globe",
    youtube: "ph-bold ph-youtube-logo",
    instagram: "ph-bold ph-instagram-logo",
  };

  const renderPersonalInfo = () => (
    <div className="border border-neutral-30 rounded-12 bg-white p-8 mt-24">
      <div className="border border-neutral-30 rounded-12 bg-main-25 p-32 bg-main-25">
        <h4 className="mb-16">Personal Info</h4>
        <span className="d-block border border-neutral-30 my-24 border-dashed" />
        <ul className="tution-info-list bg-white rounded-8">
          {user.role === "Instructor" && user.instructorProfile && (
            <>
              <li className="d-flex align-items-start px-32 py-16">
                <span className="w-50-percent fw-semibold text-neutral-700">Experience</span>
                <span className="w-50-percent fw-normal text-neutral-500 text-md">{user.instructorProfile.experienceYears} years</span>
              </li>
              <li className="d-flex align-items-start px-32 py-16">
                <span className="w-50-percent fw-semibold text-neutral-700">Current Role</span>
                <span className="w-50-percent fw-normal text-neutral-500 text-md">{user.instructorProfile.currentRole}</span>
              </li>
              <li className="d-flex align-items-start px-32 py-16">
                <span className="w-50-percent fw-semibold text-neutral-700">Currently Working At</span>
                <span className="w-50-percent fw-normal text-neutral-500 text-md">{user.instructorProfile.currentlyWorkingAt}</span>
              </li>
              <li className="d-flex align-items-start px-32 py-16">
                <span className="w-50-percent fw-semibold text-neutral-700">Previous Companies</span>
                <span className="w-50-percent fw-normal text-neutral-500 text-md">{user.instructorProfile.previousCompanies?.join(", ")}</span>
              </li>
              <li className="d-flex align-items-start px-32 py-16">
                <span className="w-50-percent fw-semibold text-neutral-700">Instructed Domains</span>
                <span className="w-50-percent fw-normal text-neutral-500 text-md">{user.instructorProfile.instructedDomains?.join(", ")}</span>
              </li>
              <li className="d-flex align-items-start px-32 py-16">
                <span className="w-50-percent fw-semibold text-neutral-700">Tech Stack</span>
                <span className="w-50-percent fw-normal text-neutral-500 text-md">{user.instructorProfile.techStack?.join(", ")}</span>
              </li>
              <li className="d-flex align-items-start px-32 py-16">
                <span className="w-50-percent fw-semibold text-neutral-700">Awards</span>
                <span className="w-50-percent fw-normal text-neutral-500 text-md">{user.instructorProfile.awards?.join(", ")}</span>
              </li>
              <li className="d-flex align-items-start px-32 py-16">
                <span className="w-50-percent fw-semibold text-neutral-700">Followers</span>
                <span className="w-50-percent fw-normal text-neutral-500 text-md">{user.instructorProfile.followers?.length}</span>
              </li>
              <li className="d-flex align-items-start px-32 py-16">
                <span className="w-50-percent fw-semibold text-neutral-700">Reviews</span>
                <span className="w-50-percent fw-normal text-neutral-500 text-md">{user.instructorProfile.reviews?.length} reviews</span>
              </li>
            </>
          )}
          {user.role === "Learner" && user.learnerProfile && (
            <>
              <li className="d-flex align-items-start px-32 py-16">
                <span className="w-50-percent fw-semibold text-neutral-700">Current Education</span>
                <span className="w-50-percent fw-normal text-neutral-500 text-md">{user.learnerProfile.currentEducation}</span>
              </li>
              <li className="d-flex align-items-start px-32 py-16">
                <span className="w-50-percent fw-semibold text-neutral-700">Year of Study</span>
                <span className="w-50-percent fw-normal text-neutral-500 text-md">{user.learnerProfile.yearOfStudy}</span>
              </li>
              <li className="d-flex align-items-start px-32 py-16">
                <span className="w-50-percent fw-semibold text-neutral-700">Interested Domains</span>
                <span className="w-50-percent fw-normal text-neutral-500 text-md">{user.learnerProfile.interestedDomains?.join(", ")}</span>
              </li>
              <li className="d-flex align-items-start px-32 py-16">
                <span className="w-50-percent fw-semibold text-neutral-700">Skill Level</span>
                <span className="w-50-percent fw-normal text-neutral-500 text-md">{user.learnerProfile.skillLevel}</span>
              </li>
              <li className="d-flex align-items-start px-32 py-16">
                <span className="w-50-percent fw-semibold text-neutral-700">Learning Goal</span>
                <span className="w-50-percent fw-normal text-neutral-500 text-md">{user.learnerProfile.learningGoal}</span>
              </li>
              <li className="d-flex align-items-start px-32 py-16">
                <span className="w-50-percent fw-semibold text-neutral-700">Preferred Learning Mode</span>
                <span className="w-50-percent fw-normal text-neutral-500 text-md">{user.learnerProfile.preferredLearningMode}</span>
              </li>
              <li className="d-flex align-items-start px-32 py-16">
                <span className="w-50-percent fw-semibold text-neutral-700">Badges</span>
                <span className="w-50-percent fw-normal text-neutral-500 text-md">{user.learnerProfile.badges?.join(", ")}</span>
              </li>
              <li className="d-flex align-items-start px-32 py-16">
                <span className="w-50-percent fw-semibold text-neutral-700">Following Instructors</span>
                <span className="w-50-percent fw-normal text-neutral-500 text-md">{user.learnerProfile.followingInstructors?.length}</span>
              </li>
            </>
          )}
        </ul>
      </div>
    </div>
  );

  const renderEducation = () => (
    <div className="border border-neutral-30 rounded-12 bg-white p-8 mt-24 text-center text-neutral-500">No educational background data.</div>
  );
  const renderStats = () => (
    <div className="border border-neutral-30 rounded-12 bg-white p-8 mt-24 text-center text-neutral-500">
      No learning stats data.
    </div>
  );
  return (
    <>
      <HeaderOne />
      <Breadcrumb title={"Profile"} />
      <section className="tutor-details py-120">
        <div className="container">
          <div className="row gy-4">
            {/* Left Card */}
            <div className="col-lg-4">
              <div className="border border-neutral-30 rounded-12 bg-white p-8">
                <div className="border border-neutral-30 rounded-12 bg-main-25 p-32 bg-main-25 text-center">
                  <div className="p-16 border border-neutral-50 rounded-circle aspect-ratio-1 max-w-150 max-h-150 mx-auto position-relative">
                    <img
                      src={user.profilePicture}
                      alt="profile"
                      className="rounded-circle bg-dark-yellow aspect-ratio-1 cover-img"
                      style={{ width: 120, height: 120, objectFit: "cover" }}
                    />
                    <span className="w-32 h-32 bg-success-600 rounded-circle border border-white border-3 flex-center text-white position-absolute bottom-0 end-0">
                      <i className="ph-bold ph-check" />
                    </span>
                  </div>

                  <h4 className="mb-12 mt-24">{user.name}</h4>

                  <div className="d-flex justify-content-center align-items-center gap-12 mb-12 flex-wrap">
                    <span className="text-neutral-500 text-md">
                      Role:{" "}
                      <span className="text-main-600 fw-medium">
                        {user.role}
                      </span>
                    </span>
                    <span className="w-4 h-4 bg-main-600 rounded-circle" />
                    <span className="text-neutral-500 text-md">
                      Gender:{" "}
                      <span className="text-main-600 fw-medium">
                        {user.gender}
                      </span>
                    </span>
                  </div>

                  <ul className="social-list flex-center gap-16 mt-20">
                    {Object.entries(user.socialLinks || {}).map(([key, val]) =>
                      val ? (
                        <li className="social-list__item" key={key}>
                          <a
                            href={val}
                            className="text-main-600 text-xl hover-text-white w-40 h-40 rounded-circle border border-main-600 hover-bg-main-600 flex-center"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <i
                              className={socialIcons[key] || "ph-bold ph-globe"}
                            />
                          </a>
                        </li>
                      ) : null
                    )}
                  </ul>

                  <span className="d-block border border-neutral-30 my-20 border-dashed" />

                  <div className="d-flex flex-column gap-16 align-items-center">
                    <div className="flex-align gap-8">
                      <i className="ph ph-phone text-primary" />
                      <span className="text-neutral-700">{user.phoneNumber || "N/A"}</span>
                    </div>
                    <div className="flex-align gap-8">
                      <i className="ph ph-envelope text-success-600" />
                      <a href={`mailto:${user.email}`} className="text-neutral-700 hover-text-main-600">
                        {user.email}
                      </a>
                    </div>
                    <div className="flex-align gap-8">
                      <i className="ph ph-map-pin text-warning" />
                      <span className="text-neutral-700">{user.location || "N/A"}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Info Section */}
            <div className="col-lg-8">
              <ul
                className="nav nav-pills common-tab d-inline-flex gap-16 bg-white p-12 border border-neutral-30 rounded-pill"
                id="pills-tab"
                role="tablist"
              >
                <li className="nav-item" role="presentation">
                  <button
                    className={`nav-link rounded-pill bg-main-25 text-md fw-medium text-neutral-500 flex-center w-100 gap-8 ${activeTab === "personal" ? "active" : ""
                      }`}
                    onClick={() => setActiveTab("personal")}
                  >
                    {" "}
                    <i className="text-xl text-main-600 d-flex ph-bold ph-user" />{" "}
                    Personal Info{" "}
                  </button>
                </li>
                <li className="nav-item" role="presentation">
                  <button
                    className={`nav-link rounded-pill bg-main-25 text-md fw-medium text-neutral-500 flex-center w-100 gap-8 ${activeTab === "education" ? "active" : ""
                      }`}
                    onClick={() => setActiveTab("education")}
                  >
                    {" "}
                    <i className="text-xl text-main-600 d-flex ph-bold ph-graduation-cap" />{" "}
                    Educational Background{" "}
                  </button>
                </li>
                <li className="nav-item" role="presentation">
                  <button
                    className={`nav-link rounded-pill bg-main-25 text-md fw-medium text-neutral-500 flex-center w-100 gap-8 ${activeTab === "stats" ? "active" : ""
                      }`}
                    onClick={() => setActiveTab("stats")}
                  >
                    {" "}
                    <i className="text-xl text-main-600 d-flex ph-bold ph-star" />{" "}
                    Learning Stats{" "}
                  </button>
                </li>
              </ul>
              <div className="tab-content" id="pills-tabContent">
                {activeTab === "personal" && renderPersonalInfo()}
                {activeTab === "education" && renderEducation()}
                {activeTab === "stats" && renderStats()}
              </div>
            </div>
          </div>
        </div>
      </section>
      <FooterOne />
    </>
  );
};

export default ProfilePage;



