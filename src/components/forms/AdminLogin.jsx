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
        borderColor: "black",
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
    backgroundColor: "rgba(255, 255, 255, 0.7)",
    padding: "30px",
    borderRadius: "10px",
    boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.3)",
    width: "100%",
    maxWidth: "475px",
  },
}));

const AdminLogin = () => {
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
