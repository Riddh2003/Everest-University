import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { Flip, toast, ToastContainer } from "react-toastify";
import { useAuth } from "../../context/AuthContext";
import axios from "axios";
import backgroundImage from '../../assets/images/Smart University.jpeg';

const StudentLogin = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [showOtpForm, setShowOtpForm] = useState(false);
  const [email, setEmail] = useState("");
  const { studentLogin } = useAuth();

  const SEND_OTP_URL = "/api/public/auth/sendotp";
  const FORGOT_PASSWORD_URL = "/api/public/auth/forgotpassword";

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const {
    register: registerForgot,
    handleSubmit: handleSubmitForgot,
    formState: { errors: errorsForgot },
  } = useForm();

  const {
    register: registerOtp,
    handleSubmit: handleSubmitOtp,
    formState: { errors: errorsOtp },
  } = useForm();

  // In the onSubmit function, update the navigation logic

  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
      const response = await studentLogin(data.enrollmentId, data.password);
      console.log("Login result:", response);

      if (response.success) {
        toast.success(response.message || "Login successful", {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Flip,
        });

        // Add a slight delay before navigation to allow the toast to be visible
        setTimeout(() => {
          navigate("/studentportal");
        }, 1000);
      } else {
        toast.error(response.message || "Login failed", {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Flip,
        });
      }
    } catch (error) {
      console.error("Error during login:", error);
      const errorMessage = error.response?.data?.message || "Login failed. Please try again.";
      toast.error(errorMessage, {
        position: "top-center",
        autoClose: 3000,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSendOtp = async (data) => {
    setIsLoading(true);
    try {
      const response = await axios.post(SEND_OTP_URL, {
        enrollmentId: data.enrollmentId,
        email: data.email
      });

      const result = response.data;

      if (result.success) {
        setEmail(data.email);
        setShowOtpForm(true);
        setShowForgotPassword(false);

        toast.success("OTP sent to your email", {
          position: "top-center",
          autoClose: 3000,
        });
      } else {
        toast.error(result.message || "Failed to send OTP", {
          position: "top-center",
          autoClose: 3000,
        });
      }
    } catch (error) {
      console.error("Error sending OTP:", error);
      const errorMessage = error.response?.data?.message || "Failed to send OTP. Please try again.";
      toast.error(errorMessage, {
        position: "top-center",
        autoClose: 3000,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleResetPassword = async (data) => {
    setIsLoading(true);
    try {
      const response = await axios.post(FORGOT_PASSWORD_URL, {
        enrollmentId: data.enrollmentId,
        email: email,
        otp: data.otp,
        password: data.newPassword
      });

      const result = response.data;

      if (result.success) {
        setShowOtpForm(false);
        setShowForgotPassword(false);

        toast.success("Password reset successful. Please login with your new password.", {
          position: "top-center",
          autoClose: 3000,
        });
      } else {
        toast.error(result.message || "Failed to reset password", {
          position: "top-center",
          autoClose: 3000,
        });
      }
    } catch (error) {
      console.error("Error resetting password:", error);
      const errorMessage = error.response?.data?.message || "Failed to reset password. Please try again.";
      toast.error(errorMessage, {
        position: "top-center",
        autoClose: 3000,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    // Update the main container div style
    <div
      className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-900/70 to-indigo-900/70 bg-cover bg-center"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      <ToastContainer position="top-center" autoClose={3000} transition={Flip} />
      {/* Update the form container styling */}
      <div className="w-full max-w-md p-8 bg-white/40 rounded-lg shadow-xl backdrop-blur-md">
        <div className="flex flex-col items-center text-[#466845] mb-6">
          <h2 className="text-3xl font-bold text-center">
            {showForgotPassword ? "Forgot Password" : showOtpForm ? "Enter OTP" : "Student Portal"}
          </h2>
          <p className="text-center mt-1">Access your academic information</p>
        </div>

        {/* Update form labels and inputs */}
        {!showForgotPassword && !showOtpForm && (
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div>
              <label htmlFor="enrollmentId" className="block text-[#466845] text-sm font-semibold">
                Enrollment ID
              </label>
              <input
                type="text"
                id="enrollmentId"
                placeholder="Enter your enrollment ID"
                {...register("enrollmentId", { required: "Enrollment ID is required" })}
                className="w-full px-4 py-3 mt-1 border border-white/20 rounded-md bg-white/30 backdrop-blur-sm text-[#466845] placeholder-[#466845] focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent"
              />
              {errors.enrollmentId && (
                <p className="mt-1 text-sm text-red-200">{errors.enrollmentId.message}</p>
              )}
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-semibold text-[#466845]">
                Password
              </label>
              <input
                type="password"
                id="password"
                placeholder="Enter your password"
                {...register("password", { required: "Password is required" })}
                className="w-full px-4 py-3 mt-1 border border-white/20 rounded-md bg-white/30 backdrop-blur-sm text-[#466845] placeholder-[#466845] focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent"
              />
              {errors.password && (
                <p className="mt-1 text-sm text-red-200">{errors.password.message}</p>
              )}
            </div>

            <div>
              <button
                type="submit"
                disabled={isLoading}
                className="w-full px-4 py-3 text-white bg-[#466845] rounded-md hover:bg-[#35533b] focus:outline-none focus:ring-2 focus:ring-white/50 focus:ring-offset-2 focus:ring-offset-indigo-700/50 disabled:opacity-50 transition-colors duration-300"
              >
                {isLoading ? (
                  <div className="flex items-center justify-center">
                    <svg className="w-5 h-5 mr-3 -ml-1 text-white animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Signing in...
                  </div>
                ) : "Sign In"}
              </button>
            </div>

            <div className="text-center">
              <button
                type="button"
                onClick={() => setShowForgotPassword(true)}
                className="text-lg font-semibold text-[#466845] hover:text-[#35533b] transition-colors duration-300"
              >
                Forgot password?
              </button>
            </div>
          </form>
        )}

        {/* Forgot Password Form */}
        {showForgotPassword && !showOtpForm && (
          <form onSubmit={handleSubmitForgot(handleSendOtp)} className="space-y-6">
            <div>
              <label htmlFor="enrollmentId" className="block text-[#466845] text-sm font-semibold">
                Enrollment ID
              </label>
              <input
                type="text"
                id="enrollmentId"
                placeholder="Enter your enrollment ID"
                {...registerForgot("enrollmentId", { required: "Enrollment ID is required" })}
                className="w-full px-4 py-3 mt-1 border border-white/20 rounded-md bg-white/30 backdrop-blur-sm text-[#466845] placeholder-[#466845] focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent"
              />
              {errorsForgot.enrollmentId && (
                <p className="mt-1 text-sm text-red-200">{errorsForgot.enrollmentId.message}</p>
              )}
            </div>

            <div>
              <label htmlFor="email" className="block text-[#466845] text-sm font-semibold">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                placeholder="Enter your email address"
                {...registerForgot("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                    message: "Invalid email format",
                  }
                })}
                className="w-full px-4 py-3 mt-1 border border-white/20 rounded-md bg-white/30 backdrop-blur-sm text-[#466845] placeholder-[#466845] focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent"
              />
              {errorsForgot.email && (
                <p className="mt-1 text-sm text-red-200">{errorsForgot.email.message}</p>
              )}
            </div>

            <div className="flex space-x-4">
              <button
                type="submit"
                disabled={isLoading}
                className="flex-1 px-4 py-3 text-white bg-[#466845] rounded-md hover:bg-[#35533b] focus:outline-none focus:ring-2 focus:ring-white/50 focus:ring-offset-2 focus:ring-offset-indigo-700/50 disabled:opacity-50 transition-colors duration-300"
              >
                {isLoading ? "Sending..." : "Send OTP"}
              </button>

              <button
                type="button"
                onClick={() => setShowForgotPassword(false)}
                className="flex-1 px-4 py-3 text-[#466845] bg-white/50 rounded-md hover:bg-white/70 focus:outline-none focus:ring-2 focus:ring-white/50 focus:ring-offset-2 focus:ring-offset-indigo-700/50 transition-colors duration-300"
              >
                Back to Login
              </button>
            </div>
          </form>
        )}

        {/* OTP and New Password Form */}
        {showOtpForm && (
          <form onSubmit={handleSubmitOtp(handleResetPassword)} className="space-y-6">
            <div>
              <label htmlFor="otp" className="block text-[#466845] text-sm font-semibold">
                OTP Code
              </label>
              <input
                type="text"
                id="otp"
                placeholder="Enter the OTP sent to your email"
                {...registerOtp("otp", {
                  required: "OTP is required",
                  pattern: {
                    value: /^[0-9]{4,6}$/,
                    message: "OTP must be 4-6 digits",
                  }
                })}
                className="w-full px-4 py-3 mt-1 border border-white/20 rounded-md bg-white/30 backdrop-blur-sm text-[#466845] placeholder-[#466845] focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent"
              />
              {errorsOtp.otp && (
                <p className="mt-1 text-sm text-red-200">{errorsOtp.otp.message}</p>
              )}
            </div>

            <div>
              <label htmlFor="enrollmentId" className="block text-[#466845] text-sm font-semibold">
                Enrollment ID
              </label>
              <input
                type="text"
                id="enrollmentId"
                placeholder="Confirm your enrollment ID"
                {...registerOtp("enrollmentId", { required: "Enrollment ID is required" })}
                className="w-full px-4 py-3 mt-1 border border-white/20 rounded-md bg-white/30 backdrop-blur-sm text-[#466845] placeholder-[#466845] focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent"
              />
              {errorsOtp.enrollmentId && (
                <p className="mt-1 text-sm text-red-200">{errorsOtp.enrollmentId.message}</p>
              )}
            </div>

            <div>
              <label htmlFor="newPassword" className="block text-[#466845] text-sm font-semibold">
                New Password
              </label>
              <input
                type="password"
                id="newPassword"
                placeholder="Enter new password"
                {...registerOtp("newPassword", {
                  required: "New password is required",
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters",
                  }
                })}
                className="w-full px-4 py-3 mt-1 border border-white/20 rounded-md bg-white/30 backdrop-blur-sm text-[#466845] placeholder-[#466845] focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent"
              />
              {errorsOtp.newPassword && (
                <p className="mt-1 text-sm text-red-200">{errorsOtp.newPassword.message}</p>
              )}
            </div>

            <div className="flex space-x-4">
              <button
                type="submit"
                disabled={isLoading}
                className="flex-1 px-4 py-3 text-white bg-[#466845] rounded-md hover:bg-[#35533b] focus:outline-none focus:ring-2 focus:ring-white/50 focus:ring-offset-2 focus:ring-offset-indigo-700/50 disabled:opacity-50 transition-colors duration-300"
              >
                {isLoading ? "Resetting..." : "Reset Password"}
              </button>

              <button
                type="button"
                onClick={() => {
                  setShowOtpForm(false);
                  setShowForgotPassword(true);
                }}
                className="flex-1 px-4 py-3 text-[#466845] bg-white/50 rounded-md hover:bg-white/70 focus:outline-none focus:ring-2 focus:ring-white/50 focus:ring-offset-2 focus:ring-offset-indigo-700/50 transition-colors duration-300"
              >
                Back
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default StudentLogin;
