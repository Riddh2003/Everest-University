import React, { useState } from "react";
import TextField from "@mui/material/TextField"; // Material-UI TextField for email input
import { makeStyles } from "@mui/styles"; // Styling with makeStyles
import axios from "axios"; // For sending HTTP requests
import { useNavigate } from "react-router-dom"; // Navigation hook for redirecting
import { Typography } from "@mui/material";

// Custom styles for Material-UI components
const useStyles = makeStyles(() => ({
    root: {
        "& .MuiOutlinedInput-root": {
            "&.Mui-focused fieldset": {
                borderColor: "green", // Green border when input is focused
            },
            fontFamily: "Metropolis, sans-serif", // Font style
        },
        "& .MuiInputLabel-root": {
            "&.Mui-focused": {
                color: "green", // Green label text when focused
            },
            fontFamily: "Metropolis, sans-serif",
        },
    },
    errorText: {
        color: "red", // Error text styling
        fontSize: "0.875rem",
        marginTop: "0.5rem",
    },
}));

// Main SendOtp component
function SendOtp({ onSendOtp }) {
    const [email, setEmail] = useState(""); // State for email input
    const [errors, setErrors] = useState({ email: "" }); // State for input errors
    const classes = useStyles(); // Custom styles
    const navigate = useNavigate(); // Navigation hook

    // Validates email input
    const validateEmail = (email) => {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Regex for valid email
        if (!email) return "Email is required"; // Error for empty input
        if (!emailPattern.test(email)) return "Invalid email format"; // Error for invalid email
        return ""; // No error
    };

    // Handles OTP sending
    const handleSendOtp = async (e) => {
        e.preventDefault(); // Prevent default form submission

        const emailError = validateEmail(email); // Validate email
        setErrors({ email: emailError }); // Update error state

        if (!emailError) {
            onSendOtp(email);
        }
    };

    return (
        <div
            className="relative h-auto w-[475px] bg-[#ffffffc2] p-7 flex flex-col rounded-md shadow-lg shadow-indigo-500/40 popup">

            <Typography variant="h4" fontWeight="bold" gutterBottom>
                Sendotp
            </Typography>

            {/* Email Input Section */}
            <div className="mt-6 space-y-4">
                <TextField
                    fullWidth
                    id="outlined-email"
                    label="Email"
                    variant="outlined"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className={classes.root}
                    error={Boolean(errors.email)} // Highlights input on error
                />
                {errors.email && (
                    <span className={classes.errorText}>{errors.email}</span> // Error message
                )}
            </div>

            {/* Send OTP Button */}
            <button
                onClick={handleSendOtp}
                className="ease-in duration-200 text-center font-semibold text-[#0082fe] bg-white rounded-md p-3 mt-5 hover:bg-[#0082fe] hover:text-white"
            >
                Send OTP
            </button>
        </div>
    );
}

export default SendOtp;
