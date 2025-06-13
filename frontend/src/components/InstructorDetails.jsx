import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

const InstructorDetails = () => {
  const { id } = useParams();
  const [instructor, setInstructor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
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
    fetchInstructor();
  }, [id]);

  if (loading)
    return <div className="text-center my-5">Loading...</div>;
  if (error)
    return <div className="text-center my-5 text-danger">{error}</div>;
  if (!instructor) return <div className="text-center my-5 text-danger">No instructor found.</div>;

  return (
    <section className='instructor-details py-120 position-relative z-1'>
      <div className='container'>
        <div className='row gy-4'>
          <div className='col-lg-4'>
            <div className='instructor-details__thumb'>
              <img
                src={instructor.profilePicture || 'assets/images/thumbs/instructor-details-thumb.png'}
                alt={instructor.name || ''}
                className='max-h-416 max-w-416 cover-img rounded-circle'
              />
              <ul className='social-list flex-center gap-16 mt-40'>
                {instructor.socialLinks?.linkedin && (
                  <li className='social-list__item'>
                    <a
                      href={instructor.socialLinks.linkedin}
                      className='text-main-600 text-xl hover-text-white w-40 h-40 rounded-circle border border-main-600 hover-bg-main-600 flex-center'
                    >
                      <i className='ph-bold ph-linkedin-logo' />
                    </a>
                  </li>
                )}
                {instructor.socialLinks?.twitter && (
                  <li className='social-list__item'>
                    <a
                      href={instructor.socialLinks.twitter}
                      className='text-main-600 text-xl hover-text-white w-40 h-40 rounded-circle border border-main-600 hover-bg-main-600 flex-center'
                    >
                      <i className='ph-bold ph-twitter-logo' />
                    </a>
                  </li>
                )}
                {instructor.socialLinks?.github && (
                  <li className='social-list__item'>
                    <a
                      href={instructor.socialLinks.github}
                      className='text-main-600 text-xl hover-text-white w-40 h-40 rounded-circle border border-main-600 hover-bg-main-600 flex-center'
                    >
                      <i className='ph-bold ph-github-logo' />
                    </a>
                  </li>
                )}
                {instructor.socialLinks?.portfolio && (
                  <li className='social-list__item'>
                    <a
                      href={instructor.socialLinks.portfolio}
                      className='text-main-600 text-xl hover-text-white w-40 h-40 rounded-circle border border-main-600 hover-bg-main-600 flex-center'
                    >
                      <i className='ph-bold ph-globe' />
                    </a>
                  </li>
                )}
                {instructor.socialLinks?.youtube && (
                  <li className='social-list__item'>
                    <a
                      href={instructor.socialLinks.youtube}
                      className='text-main-600 text-xl hover-text-white w-40 h-40 rounded-circle border border-main-600 hover-bg-main-600 flex-center'
                    >
                      <i className='ph-bold ph-youtube-logo' />
                    </a>
                  </li>
                )}
              </ul>
            </div>
          </div>
          <div className='col-lg-8 ps-xl-5'>
            <div className='ps-lg-5'>
              <h5 className='text-main-600 mb-0'>Instructor</h5>
              <h2 className='my-16'>{instructor.name}</h2>
              <span className='text-neutral-700'>{instructor.instructorProfile?.currentRole || 'Developer And Instructor'}</span>
              <div className='d-flex flex-column gap-16 flex-wrap max-w-340 mt-40'>
                <div className='flex-between gap-8'>
                  <div className='flex-align gap-8'>
                    <span className='text-neutral-700 text-2xl d-flex'>
                      <i className='ph-bold ph-lightbulb' />
                    </span>
                    <span className='text-neutral-700 text-lg fw-medium'>
                      {instructor.instructorProfile?.instructedDomains?.join(', ') || 'UI/UX Designer'}
                    </span>
                  </div>
                  <div className='flex-align gap-8'>
                    <span className='text-neutral-700 text-2xl d-flex'>
                      <i className='ph-bold ph-watch' />
                    </span>
                    <span className='text-neutral-700 text-lg fw-medium'>
                      {instructor.instructorProfile?.experienceYears ? `${instructor.instructorProfile.experienceYears} Years` : 'N/A'}
                    </span>
                  </div>
                </div>
                <div className='flex-between gap-8 flex-wrap'>
                  <div className='flex-align gap-8'>
                    <span className='text-neutral-700 text-2xl d-flex'>
                      <i className='ph-bold ph-users' />
                    </span>
                    <span className='text-neutral-700 text-lg fw-medium'>
                      {instructor.instructorProfile?.followers ? `${instructor.instructorProfile.followers.length} Followers` : '0 Followers'}
                    </span>
                  </div>
                  <div className='flex-align gap-4'>
                    <span className='text-2xl fw-medium text-warning-600 d-flex'>
                      <i className='ph-fill ph-star' />
                    </span>
                    <span className='text-lg text-neutral-700 fw-semibold'>
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
                      <span className='text-neutral-100 fw-normal'>
                        ({instructor.instructorProfile?.reviews?.length || '0'})
                      </span>
                    </span>
                  </div>
                </div>
              </div>
              <span className='d-block border border-neutral-30 my-40 border-dashed' />
              <h4 className='mb-24'>Bio Data</h4>
              <p className='text-neutral-500'>
                {instructor.bio || 'Offer brief biographies or profiles of each instructor. These may include details about their careers, achievements, and interests.'}
              </p>
              <span className='d-block border border-neutral-30 my-40 border-dashed' />
              <h4 className='mb-24'>Contact</h4>
              <div className='d-flex flex-column gap-24'>
                <div className='flex-align gap-12'>
                  <span className='text-2xl w-44 h-44 border border border-neutral-30 rounded-4 flex-center text-main-600 bg-main-25'>
                    <i className='ph-bold ph-phone-call' />
                  </span>
                  <a
                    href={`tel:${instructor.phoneNumber || '603555-0123'}`}
                    className='text-neutral-500 hover-text-main-600'
                  >
                    {instructor.phoneNumber || '(603) 555-0123, (684) 555-0102'}
                  </a>
                </div>
                <div className='flex-align gap-12'>
                  <span className='text-2xl w-44 h-44 border border border-neutral-30 rounded-4 flex-center text-success-600 bg-main-25'>
                    <i className='ph-bold ph-envelope-simple' />
                  </span>
                  <a
                    href={`mailto:${instructor.email || 'example@gmail.com'}`}
                    className='text-neutral-500 hover-text-main-600'
                  >
                    {instructor.email || 'example@gmail.com'}
                  </a>
                </div>
                <div className='flex-align gap-12'>
                  <span className='text-2xl w-44 h-44 border border border-neutral-30 rounded-4 flex-center text-warning-600 bg-main-25'>
                    <i className='ph-bold ph-map-pin-line' />
                  </span>
                  <span className='text-neutral-500'>
                    {instructor.location || '8502 Preston Rd. Inglewood, Maine 98380'}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default InstructorDetails;
