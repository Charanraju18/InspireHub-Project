import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../authContext";

const SignInInner = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth();

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", {
        email,
        password
      });
      if (res.data && res.data.user) {
        login(res.data.user, res.data.token); 
        navigate("/"); 
      } else {
        setError("Invalid credentials or account does not exist.");
      }
    } catch (err) {
      setError(
        err.response?.data?.message || "Invalid credentials or account does not exist."
      );
    }
  };

  return (
    <div className='account py-120 position-relative d-flex align-items-center justify-content-center' style={{ minHeight: '100vh' }}>
      <div className='container d-flex justify-content-center align-items-center' style={{ minHeight: '80vh' }}>
        <div className='row gy-4 align-items-center justify-content-center w-100'>
          <div className='col-lg-6 d-flex justify-content-center'>
            <div className='bg-main-25 border border-neutral-30 rounded-8 p-32' style={{ minWidth: 400, maxWidth: 800, width: '100%' }}>
              <div className='mb-40'>
                <h3 className='mb-16 text-neutral-500'>Welcome Back!</h3>
                <p className='text-neutral-500'>
                  Sign in to your account and join us
                </p>
              </div>
              <form onSubmit={handleSubmit}>
                <div className='mb-24'>
                  <label
                    htmlFor='email'
                    className='fw-medium text-lg text-neutral-500 mb-16'
                  >
                    Enter Your Email ID
                  </label>
                  <input
                    type='email'
                    className='common-input rounded-pill'
                    id='email'
                    placeholder='Enter Your Email...'
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                  />
                </div>
                <div className='mb-16'>
                  <label
                    htmlFor='password'
                    className='fw-medium text-lg text-neutral-500 mb-16'
                  >
                    Enter Your Password
                  </label>
                  <div className='position-relative'>
                    <input
                      type={passwordVisible ? "text" : "password"}
                      className='common-input rounded-pill pe-44'
                      id='password'
                      placeholder='Enter Your Password...'
                      value={password}
                      onChange={e => setPassword(e.target.value)}
                    />
                    <span
                      className={`toggle-password position-absolute top-50 inset-inline-end-0 me-16 translate-middle-y ph-bold ${passwordVisible ? "ph-eye" : "ph-eye-closed"
                        }`}
                      onClick={togglePasswordVisibility}
                    ></span>
                  </div>
                </div>
                {error && <div className="text-danger mb-2">{error}</div>}
                <div className='mb-16 text-end'>
                  <Link
                    to='#'
                    className='text-warning-600 hover-text-decoration-underline'
                  >
                    Forget password
                  </Link>
                </div>
                <div className='mb-16'>
                  <p className='text-neutral-500'>
                    Don't have an account?{" "}
                    <Link
                      to='/sign-up'
                      className='fw-semibold text-main-600 hover-text-decoration-underline'
                    >
                      Sign Up
                    </Link>
                  </p>
                </div>
                <div className='mt-40'>
                  <button
                    type='submit'
                    className='btn btn-main rounded-pill flex-center gap-8 mt-40'
                  >
                    Sign In
                    <i className='ph-bold ph-arrow-up-right d-flex text-lg' />
                  </button>
                </div>
              </form>
            </div>
          </div>
          {/* <div className='col-lg-6 d-lg-block d-none'>
            <div className='account-img'>
              <img src='assets/images/thumbs/account-img.png' alt='' />
            </div>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default SignInInner;

