import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

const InstructorDetails = ({ instructor: propInstructor, hideGetInTouch = false }) => {
  const { id } = useParams();
  const [instructor, setInstructor] = useState(propInstructor || null);
  const [loading, setLoading] = useState(!propInstructor);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (propInstructor) return;
    const fetchInstructor = async () => {
      try {
        const res = await fetch(
          `http://localhost:5000/api/auth/instructors/${id}`
        );
        const data = await res.json();
        if (!res.ok) throw new Error(data.msg || "Failed to fetch instructor");
        setInstructor(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    if (id) fetchInstructor();
  }, [id, propInstructor]);

  if (loading)
    return <div className="text-center my-5">Loading...</div>;
  if (error)
    return <div className="text-center my-5 text-danger">{error}</div>;
  if (!instructor) return <div className="text-center my-5 text-danger">No instructor found.</div>;

  return (
    <section className="instructor-details py-120 position-relative z-1">
      <div className="container">
        <div className="row gy-4">
          <div className="col-lg-4">
            <div className="border border-neutral-30 rounded-12 bg-white p-8 mb-24">
              <div className="border border-neutral-30 rounded-12 bg-main-25 p-32 bg-main-25 text-center">
                <div className="p-16 border border-neutral-50 rounded-circle aspect-ratio-1 max-w-150 max-h-150 mx-auto position-relative">
                  <img
                    src={instructor.profilePicture || 'assets/images/thumbs/instructor-details-thumb.png'}
                    alt={instructor.name || ''}
                    className="rounded-circle bg-dark-yellow aspect-ratio-1 cover-img"
                    style={{ width: 120, height: 120, objectFit: "cover" }}
                  />
                  <span className="w-32 h-32 bg-success-600 rounded-circle border border-white border-3 flex-center text-white position-absolute bottom-0 end-0">
                    <i className="ph-bold ph-check" />
                  </span>
                </div>
                {/* <h4 className="mb-12 mt-24">{instructor.name}</h4> */}
                <div className="d-flex justify-content-center align-items-center gap-12 mb-12 flex-wrap">
                  <span className="text-neutral-500 text-md">
                    Gender: <span className="text-main-600 fw-medium">{instructor.gender}</span>
                  </span>
                </div>
                <ul className="social-list flex-center gap-16 mt-20">
                  {Object.entries(instructor.socialLinks || {}).map(([key, val]) =>
                    val ? (
                      <li className="social-list__item" key={key}>
                        <a
                          href={val}
                          className="text-main-600 text-xl hover-text-white w-40 h-40 rounded-circle border border-main-600 hover-bg-main-600 flex-center"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <i className={
                            key === "linkedin"
                              ? "ph-bold ph-linkedin-logo"
                              : key === "github"
                              ? "ph-bold ph-github-logo"
                              : key === "twitter"
                              ? "ph-bold ph-twitter-logo"
                              : key === "portfolio"
                              ? "ph-bold ph-globe"
                              : key === "youtube"
                              ? "ph-bold ph-youtube-logo"
                              : key === "instagram"
                              ? "ph-bold ph-instagram-logo"
                              : "ph-bold ph-globe"
                          } />
                        </a>
                      </li>
                    ) : null
                  )}
                </ul>
                <span className="d-block border border-neutral-30 my-20 border-dashed" />
                <div className="d-flex flex-column gap-16 align-items-center">
                  <div className="flex-align gap-8">
                    <i className="ph ph-phone text-primary" />
                    <span className="text-neutral-700">{instructor.phoneNumber || "N/A"}</span>
                  </div>
                  <div className="flex-align gap-8">
                    <i className="ph ph-envelope text-success-600" />
                    <a href={`mailto:${instructor.email}`} className="text-neutral-700 hover-text-main-600">
                      {instructor.email}
                    </a>
                  </div>
                  <div className="flex-align gap-8">
                    <i className="ph ph-map-pin text-warning" />
                    <span className="text-neutral-700">{instructor.location || "N/A"}</span>
                  </div>
                </div>
              </div>
            </div>
            {/* Get in Touch Box */}
            {!hideGetInTouch && (
              <div className="border border-neutral-30 rounded-12 bg-white p-8">
                <div className="border border-neutral-30 rounded-12 bg-main-25 p-32 bg-main-25">
                  <h5 className="mb-20 text-center">Get in Touch</h5>
                  <form onSubmit={e => { e.preventDefault(); /* handle form submission here */ }}>
                    <div className="mb-16">
                      <input type="text" className="form-control" placeholder="Your Name" required />
                    </div>
                    <div className="mb-16">
                      <input type="email" className="form-control" placeholder="Your Email" required />
                    </div>
                    <div className="mb-16">
                      <textarea className="form-control" placeholder="Your Message" rows="3" required></textarea>
                    </div>
                    <button type="submit" className="btn btn-main w-100">Send Message</button>
                  </form>
                </div>
              </div>
            )}
          </div>
          {/* Right Info Section */}
          <div className="col-lg-8">
            <div className="ps-lg-5">
              <h5 className="text-main-600 mb-0">Instructor</h5>
              <div className="d-flex align-items-center gap-12 my-16 flex-wrap">
                <h2 className="mb-0" style={{fontWeight: 600, fontSize: '2rem'}}>{ instructor.name}</h2>
              </div>
              <div className="mb-16 text-neutral-700 fw-medium text-md">{instructor.instructorProfile?.currentRole || 'N/A'}</div>
              <div className="d-flex align-items-center gap-24 mb-32 flex-wrap">
                {/* Current Company */}
                <div className="d-flex align-items-center gap-8">
                  <span className="text-neutral-700 text-2xl d-flex">
                    <i className="ph-bold ph-briefcase" />
                  </span>
                  <span className="text-neutral-700 text-md fw-medium">
                    {instructor.instructorProfile?.currentlyWorkingAt || 'N/A'}
                  </span>
                </div>
                <span className="vr bg-neutral-200 mx-2" style={{ width: 2, height: 24, display: 'inline-block' }}></span>
                {/* Experience */}
                <div className="d-flex align-items-center gap-8">
                  <span className="text-neutral-700 text-2xl d-flex">
                    <i className="ph-bold ph-watch" />
                  </span>
                  <span className="text-neutral-700 text-md fw-medium">
                    {instructor.instructorProfile?.experienceYears ? `${instructor.instructorProfile.experienceYears} Years` : 'N/A'}
                  </span>
                </div>
                <span className="vr bg-neutral-200 mx-2" style={{ width: 2, height: 24, display: 'inline-block' }}></span>
                {/* Followers */}
                <div className="d-flex align-items-center gap-8">
                  <span className="text-neutral-700 text-2xl d-flex">
                    <i className="ph-bold ph-users" />
                  </span>
                  <span className="text-neutral-700 text-md fw-medium">
                    {instructor.instructorProfile?.followers ? `${instructor.instructorProfile.followers.length} Followers` : '0 Followers'}
                  </span>
                </div>
                <span className="vr bg-neutral-200 mx-2" style={{ width: 2, height: 24, display: 'inline-block' }}></span>
                {/* Reviews */}
                <div className="d-flex align-items-center gap-4">
                  <span className="text-2xl fw-medium text-warning-600 d-flex">
                    <i className="ph-fill ph-star" />
                  </span>
                  <span className="text-md text-neutral-700 fw-semibold">
                    {instructor.instructorProfile?.reviews && instructor.instructorProfile.reviews.length > 0
                      ? (
                          (
                            instructor.instructorProfile.reviews.reduce(
                              (acc, r) => acc + (typeof r.rating === 'number' ? r.rating : 0),
                              0
                            ) / instructor.instructorProfile.reviews.length
                          ).toFixed(1)
                        )
                      : 0}
                    <span className="text-neutral-100 fw-normal">
                      ({instructor.instructorProfile?.reviews?.length || '0'})
                    </span>
                  </span>
                </div>
              </div>
              <span className="d-block border border-neutral-30 my-40 border-dashed" />
              {/* About Section */}
              <h4 className="mb-24">About</h4>
              <p className="text-neutral-500">
                {instructor.bio || 'Offer brief biographies or profiles of each instructor. These may include details about their careers, achievements, and interests.'}
              </p>
              <span className="d-block border border-neutral-30 my-40 border-dashed" />
              {/* Instructed Domains Section */}
              <h4 className="mb-24">Instructed Domains</h4>
              <div className="d-flex flex-wrap gap-8 mb-32">
                {instructor.instructorProfile?.instructedDomains?.length > 0 ? (
                  instructor.instructorProfile.instructedDomains.map((domain, idx) => (
                    <span key={idx} className="badge bg-main-25 text-main-600 border border-main-600 fw-normal mb-4">{domain}</span>
                  ))
                ) : (
                  <span className="text-neutral-400">N/A</span>
                )}
              </div>
              <span className="d-block border border-neutral-30 my-40 border-dashed" />
              {/* Tech Stack Section */}
              <h4 className="mb-24">Tech Stack</h4>
              <div className="d-flex flex-wrap gap-8 mb-32">
                {instructor.instructorProfile?.techStack?.length > 0 ? (
                  instructor.instructorProfile.techStack.map((tech, idx) => (
                    <span key={idx} className="badge bg-success-100 text-success-700 border border-success-200 fw-normal mb-4">{tech}</span>
                  ))
                ) : (
                  <span className="text-neutral-400">N/A</span>
                )}
              </div>
              <span className="d-block border border-neutral-30 my-40 border-dashed" />
              {/* Awards Section */}
              <h4 className="mb-24">Awards</h4>
              <div className="d-flex flex-wrap gap-8 mb-32">
                {instructor.instructorProfile?.awards?.length > 0 ? (
                  instructor.instructorProfile.awards.map((award, idx) => (
                    <span key={idx} className="badge bg-warning-100 text-warning-700 border border-warning-200 fw-normal mb-4">{award}</span>
                  ))
                ) : (
                  <span className="text-neutral-400">N/A</span>
                )}
              </div>
              <span className="d-block border border-neutral-30 my-40 border-dashed" />
            </div>
          </div>
        </div>
        {/* Roadmaps and Events Conducted - Full Screen Below Get in Touch, Grid View */}
        <div className="row mt-5">
          <div className="col-12">
            <span className="d-block border border-neutral-30 my-40 border-dashed" />
            {/* Roadmaps Section - Grid View */}
            <h4 className="mb-24">Roadmaps</h4>
            <div className="row gy-4 mb-32">
              {(instructor.instructorProfile?.roadmaps?.length > 0
                ? instructor.instructorProfile.roadmaps
                : [
                    "Full Stack Developer Roadmap",
                    "Data Science Roadmap",
                    "Frontend Mastery Roadmap"
                  ]
              ).map((roadmap, idx) => (
                <div className="col-lg-4 col-md-6 col-12" key={idx}>
                  <div className="course-item bg-info-100 rounded-16 p-24 h-100 box-shadow-md d-flex align-items-center gap-16">
                    <span className="text-info-700 text-2xl d-flex">
                      <i className="ph-bold ph-map-trifold" />
                    </span>
                    <span className="fw-semibold text-info-700 fs-5">{roadmap}</span>
                  </div>
                </div>
              ))}
            </div>
            <span className="d-block border border-neutral-30 my-40 border-dashed" />
            {/* Events Conducted Section - Grid View */}
            <h4 className="mb-24">Events Conducted</h4>
            <div className="row gy-4">
              {(instructor.instructorProfile?.eventsConducted?.length > 0
                ? instructor.instructorProfile.eventsConducted
                : [
                    {
                      title: "Webinar: React Basics",
                      date: "March 10, 2025",
                      description: "An introductory webinar covering the fundamentals of React.js for beginners.",
                      image: "/assets/images/thumbs/course-img1.png"
                    },
                    {
                      title: "Workshop: Data Science Bootcamp",
                      date: "April 22, 2025",
                      description: "A hands-on workshop exploring data science tools and techniques for aspiring analysts.",
                      image: "/assets/images/thumbs/course-img2.png"
                    }
                  ]
              ).map((event, idx) => (
                <div className="col-lg-6 col-md-12 col-12" key={idx}>
                  <div className="course-item bg-white rounded-16 p-12 h-100 box-shadow-md d-flex flex-column flex-md-row align-items-md-center gap-24">
                    <div className="course-item__thumb rounded-12 overflow-hidden position-relative mb-3 mb-md-0" style={{minWidth: 220, maxWidth: 320}}>
                      {event.image ? (
                        <img src={event.image} alt={event.title} className="course-item__img rounded-12 cover-img transition-2 w-100" style={{height: 180, objectFit: 'cover'}} />
                      ) : (
                        <div className="bg-main-25 rounded-12 d-flex align-items-center justify-content-center" style={{height: 180}}>
                          <i className="ph-bold ph-calendar text-4xl text-main-600" />
                        </div>
                      )}
                    </div>
                    <div className="course-item__content flex-grow-1">
                      <h5 className="mb-2">{event.title}</h5>
                      <div className="mb-2 text-neutral-700 fw-medium text-md">{event.date}</div>
                      <div className="mb-2 text-neutral-500">{event.description}</div>
                      {event.link && (
                        <a href={event.link} target="_blank" rel="noopener noreferrer" className="text-main-600 fw-semibold">View Details <i className="ph ph-arrow-right" /></a>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <span className="d-block border border-neutral-30 my-40 border-dashed" />
          </div>
        </div>
        {/* Additional instructor details can be added here */}
      </div>
    </section>
  );
};

export default InstructorDetails;
