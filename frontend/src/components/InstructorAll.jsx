import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

const InstructorAll = () => {
  const [instructors, setInstructors] = useState([])  ;
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchInstructors = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/auth/instructors");
        if (!res.ok) throw new Error("Failed to fetch instructors");
        const data = await res.json();
        setInstructors(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchInstructors();
  }, []);

  return (
    <section className='instructor py-120 position-relative z-1'>
      <img
        src='assets/images/shapes/shape2.png'
        alt=''
        className='shape one animation-scalation'
      />
      <img
        src='assets/images/shapes/shape6.png'
        alt=''
        className='shape six animation-scalation'
      />
      <div className='container'>
        <div className='section-heading text-center'>
          <h2 className='mb-24'>Course Instructors</h2>
          <p className=''>
            Join us on this journey of discovery, growth, and transformation.
            Together, let's shape a brighter future
          </p>
        </div>
        {loading ? (
          <div className='text-center my-5'>Loading...</div>
        ) : error ? (
          <div className='text-center my-5 text-danger'>{error}</div>
        ) : (
          <div className='row gy-4'>
            {instructors.map((inst, idx) => (
              <div className='col-lg-4 col-sm-6' key={inst._id || idx}>
                <div className='instructor-item scale-hover-item bg-white rounded-16 p-12 h-100 border border-neutral-30'>
                  <div className='rounded-12 overflow-hidden position-relative bg-dark-yellow'>
                    <Link
                      to={`/instructor-details/${inst._id}`}
                      className='w-100 h-100 d-flex align-items-end'
                    >
                      <img
                        src={
                          inst.profilePicture ||
                          "assets/images/thumbs/instructor-img1.png"
                        }
                        alt={inst.name || "Instructor"}
                        className='scale-hover-item__img rounded-12 cover-img transition-2'
                      />
                    </Link>
                  </div>
                  <div className='p-24 position-relative'>
                    <div className='social-infos'>
                      <ul className='social-list flex-align flex-column gap-12 mb-12'>
                        {inst.socialLinks && inst.socialLinks.linkedin && (
                          <li className='social-list__item'>
                            <a
                              href={inst.socialLinks.linkedin}
                              target='_blank'
                              rel='noopener noreferrer'
                              className='flex-center border border-white text-white w-44 h-44 rounded-circle text-xl hover-text-main hover-bg-white'
                            >
                              <i className='ph-bold ph-linkedin-logo' />
                            </a>
                          </li>
                        )}
                        {inst.socialLinks && inst.socialLinks.twitter && (
                          <li className='social-list__item'>
                            <a
                              href={inst.socialLinks.twitter}
                              target='_blank'
                              rel='noopener noreferrer'
                              className='flex-center border border-white text-white w-44 h-44 rounded-circle text-xl hover-text-main hover-bg-white'
                            >
                              <i className='ph-bold ph-twitter-logo' />
                            </a>
                          </li>
                        )}
                        {inst.socialLinks && inst.socialLinks.github && (
                          <li className='social-list__item'>
                            <a
                              href={inst.socialLinks.github}
                              target='_blank'
                              rel='noopener noreferrer'
                              className='flex-center border border-white text-white w-44 h-44 rounded-circle text-xl hover-text-main hover-bg-white'
                            >
                              <i className='ph-bold ph-github-logo' />
                            </a>
                          </li>
                        )}
                        {inst.socialLinks && inst.socialLinks.portfolio && (
                          <li className='social-list__item'>
                            <a
                              href={inst.socialLinks.portfolio}
                              target='_blank'
                              rel='noopener noreferrer'
                              className='flex-center border border-white text-white w-44 h-44 rounded-circle text-xl hover-text-main hover-bg-white'
                            >
                              <i className='ph-bold ph-globe' />
                            </a>
                          </li>
                        )}
                        {inst.socialLinks && inst.socialLinks.youtube && (
                          <li className='social-list__item'>
                            <a
                              href={inst.socialLinks.youtube}
                              target='_blank'
                              rel='noopener noreferrer'
                              className='flex-center border border-white text-white w-44 h-44 rounded-circle text-xl hover-text-main hover-bg-white'
                            >
                              <i className='ph-bold ph-youtube-logo' />
                            </a>
                          </li>
                        )}
                      </ul>
                      <button className='social-infos__button flex-center w-44 h-44 bg-white text-main-600 rounded-circle text-2xl transition-2'>
                        <i className='ph-bold ph-plus' />
                      </button>
                    </div>
                    <div className=''>
                      <h4 className='mb-28 pb-24 border-bottom border-neutral-50 mb-24 border-dashed border-0'>
                        <Link
                          to={`/instructor-details/${inst._id}`}
                          className='link text-line-2'
                        >
                          {inst.name || "Instructor Name"}
                        </Link>
                      </h4>
                      <div className='flex-between gap-8 flex-wrap mb-16'>
                        <div className='flex-align gap-8'>
                          <span className='text-neutral-700 text-2xl d-flex'>
                            <i className='ph-bold ph-lightbulb' />
                          </span>
                          <span className='text-neutral-700 text-lg fw-medium'>
                            {inst.instructorProfile?.currentRole || "Specialization"}
                          </span>
                        </div>
                        <div className='flex-align gap-8'>
                          <span className='text-neutral-700 text-2xl d-flex'>
                            <i className='ph-bold ph-watch' />
                          </span>
                          <span className='text-neutral-700 text-lg fw-medium'>
                            {inst.instructorProfile?.experienceYears
                              ? `${inst.instructorProfile.experienceYears} Years`
                              : "N/A"}
                          </span>
                        </div>
                      </div>
                      <div className='flex-between gap-8 flex-wrap'>
                        <div className='flex-align gap-8'>
                          <span className='text-neutral-700 text-2xl d-flex'>
                            <i className='ph-bold ph-users' />
                          </span>
                          <span className='text-neutral-700 text-lg fw-medium'>
                            {inst.instructorProfile?.followers
                              ? `${inst.instructorProfile.followers.length} Followers`
                              : "0 Followers"}
                          </span>
                        </div>
                        <div className='flex-align gap-4'>
                          <span className='text-2xl fw-medium text-warning-600 d-flex'>
                            <i className='ph-fill ph-star' />
                          </span>
                          <span className='text-lg text-neutral-700'>
                            {inst.instructorProfile?.reviews &&
                            inst.instructorProfile.reviews.length > 0
                              ? (
                                  (
                                    inst.instructorProfile.reviews.reduce(
                                      (acc, r) => acc + (typeof r.rating === 'number' ? r.rating : 0),
                                      0
                                    ) /
                                    inst.instructorProfile.reviews.length
                                  ).toFixed(1)
                                )
                              : 0}
                            <span className='text-neutral-100'>
                              ({inst.instructorProfile?.reviews?.length || "0"})
                            </span>
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className='pt-24 border-top border-neutral-50 mt-28 border-dashed border-0'>
                      <Link
                        to={`/instructor-details/${inst._id}`}
                        className='flex-align gap-8 text-main-600 hover-text-decoration-underline transition-1 fw-semibold'
                        tabIndex={0}
                      >
                        View Profile
                        <i className='ph ph-arrow-right' />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default InstructorAll;