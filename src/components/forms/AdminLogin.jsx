import React, { useState } from "react";
import SmartUniversity from "../../assets/images/univ.jpg";
import { TextField, Button, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import { makeStyles } from "@mui/styles";
import axios from "axios";
import SendOtp from "./SendOtp";
import { Flip, toast, ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";

const useStyles = makeStyles(() => ({
    root: {
        "& .MuiOutlinedInput-root": {
            "& fieldset": {
                borderColor: "black", // Always green border
            },
            "&.Mui-focused fieldset": {
                borderColor: "green",
            },
            fontFamily: "Metropolis, sans-serif",
        },
        "& .MuiInputLabel-root": {
            color: "black",
            "&.Mui-focused": {
                color: "green",
            },
            fontFamily: "Metropolis, sans-serif",
        },
    },
    errorText: {
        color: "red",
        fontSize: "0.875rem",
        marginTop: "0.25rem",
    },
    container: {
        position: "relative",
        height: "100vh",
        background: `url(${SmartUniversity}) no-repeat center center fixed`,
        backgroundSize: "cover",
    },
    formContainer: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
    },
    form: {
        backgroundColor: "rgba(255, 255, 255, 0.7)", // Transparent background
        padding: "30px",
        borderRadius: "10px",
        boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.3)",
        width: "100%",
        maxWidth: "475px",
    },
}));

const AdminLogin = () => {
  // localStorage.setItem("role","student");
  // return (
  //     <div className="flex items-center justify-center w-screen h-screen">
  //         <div className="flex flex-col items-center w-full h-full p-6 space-y-6 bg-white rounded-lg shadow-md md:flex-row md:space-y-0 md:space-x-6">
  //             {/* Left Illustration Section */}
  //             <div className="hidden w-full h-full md:block md:w-1/2">
  //                 <img
  //                     src={smartcampus}
  //                     alt="Education Illustration"
  //                     className="object-cover w-full h-full rounded-lg"
  //                 />
  //             </div>

  //             {/* Right Login Form */}
  //             <div className="flex flex-col justify-center w-full h-full px-4 md:w-1/2 md:px-8">
  //                 <h2 className="text-2xl font-bold text-center text-gray-800 md:text-3xl">
  //                     Welcome to SmartCampus
  //                 </h2>
  //                 <p className="mt-2 text-sm text-center text-gray-500">
  //                     Need an account?{' '}
  //                     <Link to="/signup" className="text-indigo-600 hover:underline">
  //                         Sign Up
  //                     </Link>
  //                 </p>

  //                 {/* Role Selection Tabs */}
  //                 <div className="flex justify-center mt-4 space-x-2">
  //                     <button className="px-4 py-2 text-sm font-medium text-white bg-green-500 rounded-md hover:bg-green-600 focus:outline-none">
  //                         Admin
  //                     </button>
  //                     <button className="px-4 py-2 text-sm font-medium text-white bg-orange-500 rounded-md hover:bg-orange-600 focus:outline-none">
  //                         Teacher
  //                     </button>
  //                     <button className="px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none">
  //                         Student
  //                     </button>
  //                 </div>

  //                 <form className="w-full mt-6 space-y-4">
  //                     <div>
  //                         <label htmlFor="email" className="block text-sm font-medium text-gray-700">
  //                             Email
  //                         </label>
  //                         <input
  //                             type="email"
  //                             id="email"
  //                             className="w-full px-3 py-2 mt-1 border rounded-md focus:outline-none focus:ring focus:ring-indigo-200"
  //                             placeholder="abc@gmail.com"
  //                             required
  //                         />
  //                     </div>
  //                     <div>
  //                         <label htmlFor="password" className="block text-sm font-medium text-gray-700">
  //                             Password
  //                         </label>
  //                         <input
  //                             type="password"
  //                             id="password"
  //                             className="w-full px-3 py-2 mt-1 border rounded-md focus:outline-none focus:ring focus:ring-indigo-200"
  //                             placeholder="********"
  //                             required
  //                         />
  //                     </div>
  //                     <div className="flex items-center justify-between">
  //                         <label className="flex items-center">
  //                             <input
  //                                 type="checkbox"
  //                                 className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
  //                             />
  //                             <span className="ml-2 text-sm text-gray-600">Remember me</span>
  //                         </label>
  //                         <a href="#" className="text-sm text-indigo-600 hover:underline">
  //                             Forgot Password?
  //                         </a>
  //                     </div>
  //                     <button
  //                         type="submit"
  //                         className="w-full px-4 py-2 font-bold text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring focus:ring-indigo-200"
  //                     >
  //                         Login
  //                     </button>
  //                 </form>
  //             </div>
  //         </div>
  //     </div>
  // );

  // -------------------------------------------------------------------------------------------------

  const [isSendOtpOpen, setIsSendOtpOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(true);
  const [isForgotPasswordOpen, setIsForgotPasswordOpen] = useState(false);
  const classes = useStyles();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: "onChange" });

  const {
    register: forgotPasswordRegister,
    handleSubmit: handleForgotPasswordSubmit,
    formState: { errors: forgotPasswordErrors },
  } = useForm({ mode: "onChange" });

  const navigate = useNavigate();

  const validationSchema = {
    password: {
      required: {
        value: true,
        message: "Password is required",
      },
      pattern: {
        value:
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,15}$/,
        message:
          "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character",
      },
    },
  };

  const handleLogin = async (data) => {
    console.log("Login data:", data);
    try {
      const response = await axios.post(
        "http://localhost:9999/api/public/auth/adminlogin",
        {
          email: data.email,
          password: data.password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        if (response.data.success === false) {
          toast.error(response.data.message, {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            transition: Flip,
          });
        } else {
          const token = response.data.token;
          localStorage.setItem("token", token);
          localStorage.setItem("role", "admin");
          sessionStorage.setItem("token", token);
          sessionStorage.setItem("role", "admin");
          toast.success(response.data.message, {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            transition: Flip,
          });
          // Delay navigation until toast is finished
          setTimeout(() => {
            navigate("/adminportal");
          }, 3500);
        }
      } else {
        alert("An error occurred during login.");
      }
    } catch (error) {
      console.error("Error during login:", error);
      alert("An error occurred during login." + error);
    }
  };

  const handleSendOtp = async (data) => {
    console.log("Send OTP data:", data);
    try {
      const response = await axios.post(
        "http://localhost:9999/api/public/auth/sendotp",
        {
          email: data,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.status === 200) {
        if (response.data.success === false) {
          toast.error(response.data.message, {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            transition: Flip,
          });
        } else {
          toast.success(response.data.message, {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            transition: Flip,
          });
          setIsSendOtpOpen(false);
          setIsForgotPasswordOpen(true);
        }
      } else {
        alert("An error occurred during sendotp.");
      }
    } catch (error) {
      console.error("Error during sendotp:", error);
    }
  };

  const handleForgotPassword = async (data) => {
    console.log("Forgot Password data:", data);
    // Implement your forgot password logic here
  };

  return (
    <>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Flip}
      />

      <div className={classes.container}>
        <div className={classes.formContainer}>
          {isLoginOpen && (
            <div className={classes.form}>
              <Typography variant="h4" fontWeight="bold" gutterBottom>
                Login
              </Typography>

              <form onSubmit={handleSubmit(handleLogin)} className="space-y-4">
                <TextField
                  fullWidth
                  id="email"
                  label="Email"
                  type="text"
                  variant="outlined"
                  className={classes.root}
                  error={!!errors.email}
                  helperText={errors.email?.message}
                  {...register("email", {
                    required: "Email is required",
                  })}
                />

                <TextField
                  fullWidth
                  id="password"
                  label="Password"
                  type="password"
                  variant="outlined"
                  className={classes.root}
                  error={!!errors.password}
                  helperText={errors.password?.message}
                  {...register("password", {
                    required: "Password is required",
                  })}
                />

                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{
                    backgroundColor: "white",
                    color: "green",
                    padding: "10px",
                    fontWeight: "bold",
                    "&:hover": {
                      backgroundColor: "green",
                      color: "white",
                    },
                  }}
                >
                  Login
                </Button>
              </form>

              <div className="flex items-center mt-4 tracking-wide">
                <Typography variant="body1">Forgot Password?</Typography>
                <a
                  className="text-green-800 font-semibold hover:text-green-700 text-lg ml-2"
                  href="#"
                  onClick={() => {
                    setIsLoginOpen(false);
                    setIsSendOtpOpen(true);
                  }}
                >
                  Click here
                </a>
              </div>
            </div>
          )}

          {isSendOtpOpen && <SendOtp onSendOtp={handleSendOtp}></SendOtp>}

          {isForgotPasswordOpen && (
            <div className={classes.form}>
              <Typography variant="h4" fontWeight="bold" gutterBottom>
                Update Password
              </Typography>
              <form
                onSubmit={handleForgotPasswordSubmit(handleForgotPassword)}
                className="mt-6 space-y-4"
              >
                <TextField
                  fullWidth
                  id="email"
                  label="Email"
                  variant="outlined"
                  type="text"
                  className={classes.root}
                  error={!!forgotPasswordErrors.email}
                  helperText={forgotPasswordErrors.email?.message}
                  {...forgotPasswordRegister("email", {
                    required: "Email is required",
                  })}
                />

                <TextField
                  fullWidth
                  id="newPassword"
                  label="New Password"
                  variant="outlined"
                  type="password"
                  className={classes.root}
                  error={!!forgotPasswordErrors.newPassword}
                  helperText={forgotPasswordErrors.newPassword?.message}
                  {...forgotPasswordRegister(
                    "newPassword",
                    validationSchema.password
                  )}
                />

                <TextField
                  fullWidth
                  id="otp"
                  label="One Time Password"
                  variant="outlined"
                  type="text"
                  className={classes.root}
                  error={!!forgotPasswordErrors.otp}
                  helperText={forgotPasswordErrors.otp?.message}
                  {...forgotPasswordRegister("otp", {
                    required: "OTP is required",
                  })}
                />

                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{
                    backgroundColor: "#00c6ff",
                    color: "white",
                    padding: "10px",
                    fontWeight: "bold",
                    "&:hover": {
                      backgroundColor: "#0082fe",
                    },
                  }}
                >
                  Update Password
                </Button>
              </form>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default AdminLogin;
