import React, { useState } from "react";
import { useForm } from "react-hook-form";
import {
  TextField,
  Button,
  Container,
  Typography,
  Paper,
  Box,
  MenuItem,
  Grid,
} from "@mui/material";
import Loader from "../basicComponents/Loader.jsx";
import axios from "axios";
import { Flip, toast, ToastContainer } from "react-toastify";

const AdmissionForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ mode: "onTouched", reValidateMode: "onChange" });

  const onSubmit = async (data) => {
    setIsLoading(true);

    // Prepare JSON data (excluding file fields)
    const jsonData = JSON.stringify({
      surName: data.surName,
      firstName: data.firstName,
      middleName: data.middleName,
      mobileNo: data.mobileNo,
      email: data.email,
      gender: data.gender,
      dateOfBirth: data.dateOfBirth,
      city: data.city,
      state: data.state,
      program: data.program,
      degree: data.degree,
      degreeName: data.degreeName,
    });

    const formData = new FormData();
    formData.append("registrationJson", jsonData);

    // Append files (if selected)
    if (data.tenthFilePath[0]) {
      formData.append("tenthFile", data.tenthFilePath[0]);
    }
    if (data.twelthPath[0]) {
      formData.append("twelthFile", data.twelthPath[0]);
    }

    try {
      // Try using the proxy configured in vite.config.js
      const response = await axios.post(
        "/api/public/admission/registration",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true
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
          reset();
        }
      } else {
        alert("An error occurred during login.");
      }
    } catch (error) {
      console.error("Error submitting admission form:", error);

      // If proxy fails, try direct URL as fallback
      if (error.code === 'ERR_NETWORK') {
        try {
          console.log("Trying direct URL as fallback for admission form...");
          const directResponse = await axios.post(
            "http://localhost:9999/api/public/admission/registration",
            formData,
            {
              headers: {
                "Content-Type": "multipart/form-data",
              },
              withCredentials: true
            }
          );

          if (directResponse.status === 200) {
            // Handle success response
            if (directResponse.data.success === false) {
              toast.error(directResponse.data.message, {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                transition: Flip,
              });
            } else {
              toast.success(directResponse.data.message, {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                transition: Flip,
              });
              reset();
            }
            setIsLoading(false);
            return;
          }
        } catch (directError) {
          console.error("Direct URL also failed for admission form:", directError);
        }

        toast.error("Network error. Please check if the backend server is running.", {
          position: "top-center",
          autoClose: 5000,
        });
      } else {
        toast.error("Error submitting form. Please try again later.", {
          position: "top-center",
          autoClose: 5000,
        });
      }

      setIsLoading(false);
    }
  };

  const today = new Date();
  const fifteenYearsAgo = new Date(today.setFullYear(today.getFullYear() - 15))
    .toISOString()
    .split("T")[0];

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

      <Container className="p-5 w-full max-w-4xl mx-auto">
        {isLoading && <Loader />}
        <Paper className="p-5 shadow-lg rounded-lg bg-white border border-[#345d7c]">
          <Typography
            variant="h4"
            className="text-center font-semibold text-2xl text-[#5CB338]"
          >
            Student Registration
          </Typography>
          <form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  {...register("surName", { required: "Surname is required" })}
                  label="Surname"
                  fullWidth
                  error={!!errors.surName}
                  helperText={errors.surName?.message}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  {...register("firstName", {
                    required: "First Name is required",
                  })}
                  label="First Name"
                  fullWidth
                  error={!!errors.firstName}
                  helperText={errors.firstName?.message}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  {...register("middleName", {
                    required: "Middle Name is required",
                  })}
                  label="Middle Name"
                  fullWidth
                  error={!!errors.middleName}
                  helperText={errors.middleName?.message}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  {...register("mobileNo", {
                    required: "Mobile Number is required",
                  })}
                  label="Mobile Number"
                  fullWidth
                  error={!!errors.mobileNo}
                  helperText={errors.mobileNo?.message}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  {...register("email", { required: "Email is required" })}
                  label="Email"
                  fullWidth
                  error={!!errors.email}
                  helperText={errors.email?.message}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  select
                  {...register("gender", { required: "Gender is required" })}
                  label="Gender"
                  fullWidth
                  error={!!errors.gender}
                  helperText={errors.gender?.message}
                >
                  <MenuItem value="Male">Male</MenuItem>
                  <MenuItem value="Female">Female</MenuItem>
                  <MenuItem value="Other">Other</MenuItem>
                </TextField>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  type="date"
                  {...register("dateOfBirth", {
                    required: "Date of Birth is required",
                    validate: (value) =>
                      (value && value <= fifteenYearsAgo) ||
                      "Date must be at least 15 years ago",
                  })}
                  label="Date of Birth"
                  fullWidth
                  error={!!errors.dateOfBirth}
                  helperText={errors.dateOfBirth?.message}
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  {...register("city", { required: "City is required" })}
                  label="City"
                  fullWidth
                  error={!!errors.city}
                  helperText={errors.city?.message}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  {...register("state", { required: "State is required" })}
                  label="State"
                  fullWidth
                  error={!!errors.state}
                  helperText={errors.state?.message}
                />
              </Grid>
              <Grid item xs={12}>
                <Typography variant="h6" style={{ color: "#009488" }}>
                  Document Upload
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <input
                  type="file"
                  accept="application/pdf"
                  {...register("tenthFilePath", {
                    required: "10th Marksheet is required",
                  })}
                  className="border p-2 rounded w-full"
                />
                <Typography variant="body2" color="error">
                  {errors.tenthFilePath?.message}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <input
                  type="file"
                  accept="application/pdf"
                  {...register("twelthPath", {
                    required: "12th Marksheet is required",
                  })}
                  className="border p-2 rounded w-full"
                />
                <Typography variant="body2" color="error">
                  {errors.twelthPath?.message}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  {...register("program", { required: "Program is required" })}
                  label="Program (UG/PG)"
                  fullWidth
                  error={!!errors.program}
                  helperText={errors.program?.message}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  {...register("degree", { required: "Degree is required" })}
                  label="Degree (BCA/MCA)"
                  fullWidth
                  error={!!errors.degree}
                  helperText={errors.degree?.message}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  {...register("degreeName", {
                    required: "Degree Name is required",
                  })}
                  label="Degree Name (Full)"
                  fullWidth
                  error={!!errors.degreeName}
                  helperText={errors.degreeName?.message}
                />
              </Grid>
            </Grid>
            <Box display="flex" justifyContent="center" mt={4}>
              <Button variant="contained" color="success" type="submit">
                Submit
              </Button>
            </Box>
          </form>
        </Paper>
      </Container>
    </>
  );
};

export default AdmissionForm;