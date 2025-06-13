import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const ResetPassComp = () => {
  const { token } = useParams();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const togglePasswordVisibility = () => setPasswordVisible((v) => !v);
  const toggleConfirmPasswordVisibility = () => setConfirmPasswordVisible((v) => !v);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");
    if (!password) {
      setError("New password is required.");
      return;
    }
    if (!confirmPassword) {
      setError("Please confirm your new password.");
      return;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    setLoading(true);
    try {
      const res = await fetch(`http://localhost:5000/api/auth/reset-password/${token}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ newPassword: password })
      });
      if (res.ok) {
        setMessage("Password reset successful. You can now sign in.");
        setTimeout(() => navigate("/sign-in"), 2500);
      } else {
        const data = await res.json();
        setError(data.message || "Failed to reset password.");
      }
    } catch (err) {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='account py-120 position-relative d-flex align-items-center justify-content-center' style={{ minHeight: '100vh' }}>
      <div className='container d-flex justify-content-center align-items-center' style={{ minHeight: '80vh' }}>
        <div className='row gy-4 align-items-center justify-content-center w-100'>
          <div className='col-lg-6 d-flex justify-content-center'>
            <div className='bg-main-25 border border-neutral-30 rounded-8 p-32' style={{ minWidth: 400, maxWidth: 800, width: '100%' }}>
              <div className='mb-40'>
                <h3 className='mb-16 text-neutral-500'>Reset Password</h3>
                <p className='text-neutral-500'>Enter your new password below.</p>
              </div>
              <form onSubmit={handleSubmit}>
                <div className='mb-24'>
                  <label htmlFor='password' className='fw-medium text-lg text-neutral-500 mb-16'>New Password</label>
                  <div className='position-relative'>
                    <input
                      type={passwordVisible ? "text" : "password"}
                      className='common-input rounded-pill pe-44'
                      id='password'
                      placeholder='Enter New Password...'
                      value={password}
                      onChange={e => setPassword(e.target.value)}
                      required
                    />
                    <span
                      className={`toggle-password position-absolute top-50 inset-inline-end-0 me-16 translate-middle-y ph-bold ${passwordVisible ? "ph-eye" : "ph-eye-closed"}`}
                      onClick={togglePasswordVisibility}
                      style={{ cursor: 'pointer' }}
                    ></span>
                  </div>
                </div>
                <div className='mb-24'>
                  <label htmlFor='confirmPassword' className='fw-medium text-lg text-neutral-500 mb-16'>Confirm New Password</label>
                  <div className='position-relative'>
                    <input
                      type={confirmPasswordVisible ? "text" : "password"}
                      className='common-input rounded-pill pe-44'
                      id='confirmPassword'
                      placeholder='Confirm New Password...'
                      value={confirmPassword}
                      onChange={e => setConfirmPassword(e.target.value)}
                      required
                    />
                    <span
                      className={`toggle-password position-absolute top-50 inset-inline-end-0 me-16 translate-middle-y ph-bold ${confirmPasswordVisible ? "ph-eye" : "ph-eye-closed"}`}
                      onClick={toggleConfirmPasswordVisibility}
                      style={{ cursor: 'pointer' }}
                    ></span>
                  </div>
                </div>
                {error && <div className="text-danger mb-2">{error}</div>}
                {message && <div className="text-success mb-2">{message}</div>}
                <div className='mt-40'>
                  <button type='submit' className='btn btn-main rounded-pill flex-center gap-8 mt-40' disabled={loading}>
                    {loading ? "Resetting..." : "Reset Password"}
                    <i className='ph-bold ph-arrow-up-right d-flex text-lg' />
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResetPassComp;
