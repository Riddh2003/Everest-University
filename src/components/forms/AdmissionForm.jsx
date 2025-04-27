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
import axios from 'axios';
import { Flip, toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AdmissionForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [tenthFile, setTenthFile] = useState(null);
  const [twelthFile, setTwelthFile] = useState(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    mode: "onTouched",
    reValidateMode: "onChange",
    defaultValues: {
      surName: '',
      firstName: '',
      middleName: '',
      mobileNo: '',
      email: '',
      gender: '',
      dateOfBirth: '',
      city: '',
      state: '',
      program: '',
      degree: '',
      degreeName: '',
    }
  });

  const validateFile = (file, fieldName) => {
    if (!file) {
      toast.error(`${fieldName} is required`, {
        position: "top-center",
        autoClose: 3000
      });
      return false;
    }

    if (file.type !== 'application/pdf') {
      toast.error(`${fieldName} must be a PDF file`, {
        position: "top-center",
        autoClose: 3000
      });
      return false;
    }

    if (file.size > 5 * 1024 * 1024) { // 5MB limit
      toast.error(`${fieldName} must be less than 5MB`, {
        position: "top-center",
        autoClose: 3000
      });
      return false;
    }

    return true;
  };

  const handleTenthFileChange = (event) => {
    const file = event.target.files[0];
    if (file && validateFile(file, "10th Marksheet")) {
      setTenthFile(file);
    } else {
      event.target.value = '';
    }
  };

  const handleTwelthFileChange = (event) => {
    const file = event.target.files[0];
    if (file && validateFile(file, "12th Marksheet")) {
      setTwelthFile(file);
    } else {
      event.target.value = '';
    }
  };

  const onSubmit = async (data) => {
    try {
      setIsLoading(true);

      // Validate required files
      if (!tenthFile || !twelthFile) {
        toast.error("Both 10th and 12th marksheets are required", {
          position: "top-center",
          autoClose: 3000
        });
        return;
      }

      // Create form data
      const formData = new FormData();

      // Add student details as a JSON string
      const studentDetails = {
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
        degreeName: data.degreeName
      };

      // Append student details and files
      formData.append("registrationJson", JSON.stringify(studentDetails));
      formData.append("tenthFile", tenthFile);
      formData.append("twelthFile", twelthFile);

      const response = await axios.post(
        'http://localhost:9999/api/public/admission/registration',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }
      );

      if (response.data.success) {
        toast.success(response.data.message || "Registration successful!", {
          position: "top-center",
          autoClose: 3000
        });

        // Reset form and file states
        reset();
        setTenthFile(null);
        setTwelthFile(null);

        // Reset file inputs
        document.getElementById('tenthFileInput').value = '';
        document.getElementById('twelthFileInput').value = '';
      } else {
        throw new Error(response.data.message || "Registration failed");
      }
    } catch (error) {
      console.error("Registration error:", error);
      toast.error(error.response?.data?.message || "Failed to submit form", {
        position: "top-center",
        autoClose: 3000
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Calculate date for age validation
  const today = new Date();
  const fifteenYearsAgo = new Date(today.setFullYear(today.getFullYear() - 15))
    .toISOString()
    .split("T")[0];

  return (
    <>
      <ToastContainer position="top-center" autoClose={3000} />

      <Container className="p-5 w-full max-w-4xl mx-auto">
        {isLoading && (
          <div className="fixed inset-0 flex justify-center items-center bg-white/80 z-50">
            <Loader />
          </div>
        )}
        <Paper className="p-5 shadow-lg rounded-lg bg-white border border-[#345d7c]">
          <Typography variant="h4" className="text-center font-semibold text-2xl text-[#5CB338] mb-4">
            Student Registration
          </Typography>

          <form onSubmit={handleSubmit(onSubmit)} noValidate>
            <Grid container spacing={3}>
              {/* Personal Information */}
              <Grid item xs={12} sm={6}>
                <TextField
                  {...register("surName", {
                    required: "Surname is required",
                    pattern: {
                      value: /^[A-Za-z\s]+$/,
                      message: "Only letters are allowed"
                    }
                  })}
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
                  id="tenthFileInput"
                  type="file"
                  accept="application/pdf"
                  onChange={handleTenthFileChange}
                  className="border p-2 rounded w-full"
                />
                {!tenthFile && (
                  <Typography variant="body2" color="error">
                    10th Marksheet is required (PDF only, max 5MB)
                  </Typography>
                )}
              </Grid>
              <Grid item xs={12} sm={6}>
                <input
                  id="twelthFileInput"
                  type="file"
                  accept="application/pdf"
                  onChange={handleTwelthFileChange}
                  className="border p-2 rounded w-full"
                />
                {!twelthFile && (
                  <Typography variant="body2" color="error">
                    12th Marksheet is required (PDF only, max 5MB)
                  </Typography>
                )}
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
              <Grid item xs={12}>
                <Box display="flex" justifyContent="center" mt={2}>
                  <Button
                    variant="contained"
                    color="success"
                    type="submit"
                    disabled={isLoading}
                  >
                    {isLoading ? "Submitting..." : "Submit"}
                  </Button>
                </Box>
              </Grid>
            </Grid>
          </form>
        </Paper>
      </Container>
    </>
  );
};

export default AdmissionForm;