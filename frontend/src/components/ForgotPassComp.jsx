import { useState } from "react";

const ForgotPassComp = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");
    setLoading(true);
    try {
      const res = await fetch("http://localhost:5000/api/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email })
      });
      if (res.ok) {
        setMessage("Password reset instructions sent to your email.");
      } else {
        const data = await res.json();
        setError(data.message || "Failed to send reset instructions.");
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
                <h3 className='mb-16 text-neutral-500'>Forgot Password?</h3>
                <p className='text-neutral-500'>Enter your email to receive password reset instructions.</p>
              </div>
              <form onSubmit={handleSubmit}>
                <div className='mb-24'>
                  <label htmlFor='email' className='fw-medium text-lg text-neutral-500 mb-16'>Enter Your Email ID</label>
                  <input type='email' className='common-input rounded-pill' id='email' placeholder='Enter Your Email...' value={email} onChange={e => setEmail(e.target.value)} required />
                </div>
                {error && <div className="text-danger mb-2">{error}</div>}
                {message && <div className="text-success mb-2">{message}</div>}
                <div className='mt-40'>
                  <button type='submit' className='btn btn-main rounded-pill flex-center gap-8 mt-40' disabled={loading}>
                    {loading ? "Sending..." : "Send Reset Link"}
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

export default ForgotPassComp;
