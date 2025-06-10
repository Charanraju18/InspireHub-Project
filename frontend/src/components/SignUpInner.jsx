import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const SignUpInner = () => {
  const [form, setForm] = useState({
    name: "",
    gender: "",
    email: "",
    password: "",
    profilePicture: "",
    phoneNumber: "",
    location: "",
    bio: "",
    socialLinks: {
      linkedin: "",
      github: "",
      twitter: "",
      portfolio: "",
      youtube: ""
    },
    role: "",
    // Instructor fields
    experienceYears: "",
    currentlyWorkingAt: "",
    currentRole: "",
    previousCompanies: "",
    instructedDomains: "",
    techStack: "",
    // Learner fields
    currentEducation: "",
    yearOfStudy: "",
    interestedDomains: "",
    skillLevel: "",
    learningGoal: "",
    preferredLearningMode: ""
  });
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith("socialLinks.")) {
      setForm({
        ...form,
        socialLinks: {
          ...form.socialLinks,
          [name.split(".")[1]]: value
        }
      });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleRoleChange = (e) => {
    setForm({ ...form, role: e.target.value });
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setForm((prev) => ({ ...prev, profilePicture: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    // Prepare payload
    const payload = {
      name: form.name,
      gender: form.gender,
      email: form.email,
      password: form.password,
      profilePicture: form.profilePicture,
      phoneNumber: form.phoneNumber.trim(),
      location: form.location.trim(),
      bio: form.bio,
      socialLinks: form.socialLinks,
      role: form.role,
    };
    if (form.role === "Instructor") {
      payload.instructorProfile = {
        experienceYears: form.experienceYears,
        currentlyWorkingAt: form.currentlyWorkingAt,
        currentRole: form.currentRole,
        previousCompanies: form.previousCompanies.split(",").map(s => s.trim()).filter(Boolean),
        instructedDomains: form.instructedDomains.split(",").map(s => s.trim()).filter(Boolean),
        techStack: form.techStack.split(",").map(s => s.trim()).filter(Boolean),
      };
    } else if (form.role === "Learner") {
      payload.learnerProfile = {
        currentEducation: form.currentEducation,
        yearOfStudy: form.yearOfStudy,
        interestedDomains: form.interestedDomains.split(",").map(s => s.trim()).filter(Boolean),
        skillLevel: form.skillLevel,
        learningGoal: form.learningGoal,
        preferredLearningMode: form.preferredLearningMode,
      };
    }
    try {
      const res = await fetch("http://localhost:5000/api/auth/full-signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
      if (res.ok) {
        navigate("/sign-in");
      } else {
        const data = await res.json();
        setError(data.msg || "Signup failed.");
      }
    } catch (err) {
      setError("Network error. Please try again.");
    }
  };

  return (
    <section className='py-120'>
      <div className='container'>
        <div className='border border-neutral-30 rounded-12 bg-main-25 p-24 bg-main-25'>
          <form onSubmit={handleSubmit}>
            <h3 className='mb-24'>Sign Up</h3>
            {/* Personal Info */}
            <div className='border border-neutral-30 rounded-12 bg-white p-24'>
              <h5 className='mb-0'>Personal Information</h5>
              <span className='d-block border border-main-50 my-24 border-dashed' />
              <div className='row gy-4'>
                <div className='col-sm-6'>
                  <label htmlFor='name' className='text-neutral-700 text-lg fw-medium mb-12'>Full Name <span className='text-danger-600'>*</span></label>
                  <input type='text' className='common-input bg-main-25 rounded-pill border-transparent focus-border-main-600' id='name' name='name' placeholder='Enter Your Name...' value={form.name} onChange={handleChange} required />
                </div>
                <div className='col-sm-6'>
                  <label className='text-neutral-700 text-lg fw-medium mb-12'>Gender <span className='text-danger-600'>*</span></label>
                  <select className='common-input bg-main-25 rounded-pill border-transparent focus-border-main-600 form-select py-14' name='gender' value={form.gender} onChange={handleChange} required>
                    <option value=''>Select Gender</option>
                    <option value='Male'>Male</option>
                    <option value='Female'>Female</option>
                    <option value='Other'>Other</option>
                  </select>
                </div>
                <div className='col-sm-6'>
                  <label htmlFor='email' className='text-neutral-700 text-lg fw-medium mb-12'>Email <span className='text-danger-600'>*</span></label>
                  <input type='email' className='common-input bg-main-25 rounded-pill border-transparent focus-border-main-600' id='email' name='email' placeholder='Enter Your Email...' value={form.email} onChange={handleChange} required />
                </div>
                <div className='col-sm-6'>
                  <label htmlFor='password' className='text-neutral-700 text-lg fw-medium mb-12'>Password <span className='text-danger-600'>*</span></label>
                  <div className='position-relative'>
                    <input type={passwordVisible ? "text" : "password"} className='common-input bg-main-25 rounded-pill border-transparent focus-border-main-600 pe-44' id='password' name='password' placeholder='Enter Your Password...' value={form.password} onChange={handleChange} required />
                    <span className={`toggle-password position-absolute top-50 inset-inline-end-0 me-16 translate-middle-y ph-bold ${passwordVisible ? "ph-eye" : "ph-eye-closed"}`} onClick={togglePasswordVisibility}></span>
                  </div>
                </div>
                <div className='col-sm-6'>
                  <label htmlFor='profilePicture' className='text-neutral-700 text-lg fw-medium mb-12'>Profile Picture</label>
                  <input type='file' accept='image/*' className='common-input bg-main-25 rounded-pill border-transparent focus-border-main-600' id='profilePicture' name='profilePicture' onChange={handleFileChange} />
                  {form.profilePicture && (
                    <img src={form.profilePicture} alt='Preview' style={{ maxWidth: 80, maxHeight: 80, marginTop: 8, borderRadius: '50%' }} />
                  )}
                </div>
                <div className='col-sm-6'>
                  <label htmlFor='bio' className='text-neutral-700 text-lg fw-medium mb-12'>Bio</label>
                  <textarea className='common-input bg-main-25 rounded-24 border-transparent focus-border-main-600' id='bio' name='bio' placeholder='Tell us about yourself...' value={form.bio} onChange={handleChange} />
                </div>
                <div className='col-sm-6'>
                  <label htmlFor='phoneNumber' className='text-neutral-700 text-lg fw-medium mb-12'>Phone Number <span className='text-danger-600'>*</span></label>
                  <input type='text' className='common-input bg-main-25 rounded-pill border-transparent focus-border-main-600' id='phoneNumber' name='phoneNumber' placeholder='Enter Your Phone Number...' value={form.phoneNumber} onChange={handleChange} required />
                </div>
                <div className='col-sm-6'>
                  <label htmlFor='location' className='text-neutral-700 text-lg fw-medium mb-12'>Location <span className='text-danger-600'>*</span></label>
                  <input type='text' className='common-input bg-main-25 rounded-pill border-transparent focus-border-main-600' id='location' name='location' placeholder='Enter Your Location...' value={form.location} onChange={handleChange} required />
                </div>
                {/* Social Links */}
                <div className='col-sm-12'>
                  <label className='text-neutral-700 text-lg fw-medium mb-12'>Social Links</label>
                  <div className='row gy-2'>
                    <div className='col-sm-4'><input type='text' className='common-input bg-main-25 rounded-pill border-transparent focus-border-main-600' name='socialLinks.linkedin' placeholder='LinkedIn' value={form.socialLinks.linkedin} onChange={handleChange} /></div>
                    <div className='col-sm-4'><input type='text' className='common-input bg-main-25 rounded-pill border-transparent focus-border-main-600' name='socialLinks.github' placeholder='GitHub' value={form.socialLinks.github} onChange={handleChange} /></div>
                    <div className='col-sm-4'><input type='text' className='common-input bg-main-25 rounded-pill border-transparent focus-border-main-600' name='socialLinks.twitter' placeholder='Twitter' value={form.socialLinks.twitter} onChange={handleChange} /></div>
                    <div className='col-sm-4'><input type='text' className='common-input bg-main-25 rounded-pill border-transparent focus-border-main-600' name='socialLinks.portfolio' placeholder='Portfolio' value={form.socialLinks.portfolio} onChange={handleChange} /></div>
                    <div className='col-sm-4'><input type='text' className='common-input bg-main-25 rounded-pill border-transparent focus-border-main-600' name='socialLinks.youtube' placeholder='YouTube' value={form.socialLinks.youtube} onChange={handleChange} /></div>
                  </div>
                </div>
                {/* Role Dropdown */}
                <div className='col-sm-6'>
                  <label htmlFor='role' className='text-neutral-700 text-lg fw-medium mb-12'>Role <span className='text-danger-600'>*</span></label>
                  <select className='common-input bg-main-25 rounded-pill border-transparent focus-border-main-600 form-select py-14' id='role' name='role' value={form.role} onChange={handleRoleChange} required>
                    <option value=''>Select Role</option>
                    <option value='Instructor'>Instructor</option>
                    <option value='Learner'>Learner</option>
                  </select>
                </div>
              </div>
            </div>
            {/* Instructor Fields */}
            {form.role === "Instructor" && (
              <div className='border border-neutral-30 rounded-12 bg-white p-24 mt-24'>
                <h5 className='mb-0'>Instructor Profile</h5>
                <span className='d-block border border-main-50 my-24 border-dashed' />
                <div className='row gy-4'>
                  <div className='col-sm-4'>
                    <label className='text-neutral-700 text-lg fw-medium mb-12'>Years of Experience</label>
                    <input type='number' className='common-input bg-main-25 rounded-pill border-transparent focus-border-main-600' name='experienceYears' placeholder='e.g. 5' value={form.experienceYears} onChange={handleChange} />
                  </div>
                  <div className='col-sm-4'>
                    <label className='text-neutral-700 text-lg fw-medium mb-12'>Currently Working At</label>
                    <input type='text' className='common-input bg-main-25 rounded-pill border-transparent focus-border-main-600' name='currentlyWorkingAt' placeholder='Company/Institute' value={form.currentlyWorkingAt} onChange={handleChange} />
                  </div>
                  <div className='col-sm-4'>
                    <label className='text-neutral-700 text-lg fw-medium mb-12'>Current Role</label>
                    <input type='text' className='common-input bg-main-25 rounded-pill border-transparent focus-border-main-600' name='currentRole' placeholder='e.g. Senior Instructor' value={form.currentRole} onChange={handleChange} />
                  </div>
                  <div className='col-sm-6'>
                    <label className='text-neutral-700 text-lg fw-medium mb-12'>Previous Companies (comma separated)</label>
                    <input type='text' className='common-input bg-main-25 rounded-pill border-transparent focus-border-main-600' name='previousCompanies' placeholder='e.g. Google, Microsoft' value={form.previousCompanies} onChange={handleChange} />
                  </div>
                  <div className='col-sm-6'>
                    <label className='text-neutral-700 text-lg fw-medium mb-12'>Instructed Domains (comma separated)</label>
                    <input type='text' className='common-input bg-main-25 rounded-pill border-transparent focus-border-main-600' name='instructedDomains' placeholder='e.g. Web Dev, AI' value={form.instructedDomains} onChange={handleChange} />
                  </div>
                  <div className='col-sm-12'>
                    <label className='text-neutral-700 text-lg fw-medium mb-12'>Tech Stack (comma separated)</label>
                    <input type='text' className='common-input bg-main-25 rounded-pill border-transparent focus-border-main-600' name='techStack' placeholder='e.g. React, Node.js, Python' value={form.techStack} onChange={handleChange} />
                  </div>
                </div>
              </div>
            )}
            {/* Learner Fields */}
            {form.role === "Learner" && (
              <div className='border border-neutral-30 rounded-12 bg-white p-24 mt-24'>
                <h5 className='mb-0'>Learner Profile</h5>
                <span className='d-block border border-main-50 my-24 border-dashed' />
                <div className='row gy-4'>
                  <div className='col-sm-4'>
                    <label className='text-neutral-700 text-lg fw-medium mb-12'>Current Education</label>
                    <input type='text' className='common-input bg-main-25 rounded-pill border-transparent focus-border-main-600' name='currentEducation' placeholder='e.g. BSc Computer Science' value={form.currentEducation} onChange={handleChange} />
                  </div>
                  <div className='col-sm-4'>
                    <label className='text-neutral-700 text-lg fw-medium mb-12'>Year of Study</label>
                    <input type='text' className='common-input bg-main-25 rounded-pill border-transparent focus-border-main-600' name='yearOfStudy' placeholder='e.g. 2nd Year' value={form.yearOfStudy} onChange={handleChange} />
                  </div>
                  <div className='col-sm-4'>
                    <label className='text-neutral-700 text-lg fw-medium mb-12'>Interested Domains (comma separated)</label>
                    <input type='text' className='common-input bg-main-25 rounded-pill border-transparent focus-border-main-600' name='interestedDomains' placeholder='e.g. Data Science, ML' value={form.interestedDomains} onChange={handleChange} />
                  </div>
                  <div className='col-sm-4'>
                    <label className='text-neutral-700 text-lg fw-medium mb-12'>Skill Level</label>
                    <select className='common-input bg-main-25 rounded-pill border-transparent focus-border-main-600 form-select py-14' name='skillLevel' value={form.skillLevel} onChange={handleChange}>
                      <option value=''>Select</option>
                      <option value='Beginner'>Beginner</option>
                      <option value='Intermediate'>Intermediate</option>
                      <option value='Advanced'>Advanced</option>
                    </select>
                  </div>
                  <div className='col-sm-4'>
                    <label className='text-neutral-700 text-lg fw-medium mb-12'>Learning Goal</label>
                    <input type='text' className='common-input bg-main-25 rounded-pill border-transparent focus-border-main-600' name='learningGoal' placeholder='e.g. Become a developer' value={form.learningGoal} onChange={handleChange} />
                  </div>
                  <div className='col-sm-4'>
                    <label className='text-neutral-700 text-lg fw-medium mb-12'>Preferred Learning Mode</label>
                    <select className='common-input bg-main-25 rounded-pill border-transparent focus-border-main-600 form-select py-14' name='preferredLearningMode' value={form.preferredLearningMode} onChange={handleChange}>
                      <option value=''>Select</option>
                      <option value='Video'>Video</option>
                      <option value='Article'>Article</option>
                      <option value='Project-Based'>Project-Based</option>
                    </select>
                  </div>
                </div>
              </div>
            )}
            {error && <div className='text-danger mb-2'>{error}</div>}
            <div className='col-sm-12 mt-24'>
              <button type='submit' className='btn btn-main rounded-pill flex-center gap-8'>
                Sign Up
                <i className='ph-bold ph-arrow-up-right d-flex text-lg' />
              </button>
            </div>
            <div className='col-sm-12'>
              <p className='text-neutral-500 mt-8'>
                Have an account?{' '}
                <Link to='/sign-in' className='fw-semibold text-main-600 hover-text-decoration-underline'>Sign In</Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default SignUpInner;
