import React from 'react';
import { Box, TextField, Button } from '@mui/material';
import { useForm } from 'react-hook-form';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { styled } from '@mui/material/styles';

const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
});

const MaterialForm = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();

    const submitHandler = (data) => {
        console.log(data);
    };

    return (
        <Box
            component="form"
            onSubmit={handleSubmit(submitHandler)}
            className="max-w-lg mx-auto p-6 rounded-lg shadow-lg bg-[#f7fbfc]"
        >
            <h1 className="text-center mb-6 text-2xl font-semibold text-[#0d9488]">Upload Book and Details</h1>

            {/* Book Title */}
            <div className="mb-6">
                <TextField
                    label="Book Title"
                    fullWidth
                    variant="outlined"
                    {...register("book_title", { required: "Book Title is required" })}
                    error={!!errors.book_title}
                    helperText={errors.book_title ? <span className="text-red-500 text-sm">{errors.book_title.message}</span> : ''}
                    className="mb-2"
                />
            </div>

            {/* File Upload (Book File) */}
            <div className="mb-6">
                <Button
                    component="label"
                    variant="contained"
                    startIcon={<CloudUploadIcon />}
                    fullWidth
                >
                    Upload Book File (PDF only)
                    <VisuallyHiddenInput
                        type="file"
                        {...register("book_file", {
                            required: "Book file is required",
                            validate: (files) => {
                                const file = files?.[0];
                                if (file && file.type !== 'application/pdf') {
                                    return 'Only PDF files are allowed';
                                }
                                return true;
                            }
                        })}
                        onChange={(e) => console.log(e.target.files)}
                    />
                </Button>
                {errors.book_file && (
                    <span className="text-red-500 text-sm">{errors.book_file.message}</span>
                )}
            </div>

            {/* File Upload (Course Book Picture) */}
            <div className="mb-6">
                <Button
                    component="label"
                    variant="contained"
                    startIcon={<CloudUploadIcon />}
                    fullWidth
                >
                    Upload Course Book Picture (JPG/PNG only)
                    <VisuallyHiddenInput
                        type="file"
                        {...register("course_book_pic", {
                            required: "Course book picture is required",
                            validate: (files) => {
                                const file = files?.[0];
                                if (file && !['image/jpeg', 'image/png'].includes(file.type)) {
                                    return 'Only JPG and PNG files are allowed';
                                }
                                return true;
                            }
                        })}
                        onChange={(e) => console.log(e.target.files)}
                    />
                </Button>
                {errors.course_book_pic && (
                    <span className="text-red-500 text-sm">{errors.course_book_pic.message}</span>
                )}
            </div>

            {/* Hidden Course ID */}
            <input type="hidden" {...register("course_id", { value: "12345" })} />

            {/* Submit Button */}
            <Button
                type="submit"
                variant="contained"
                color="success"
                className="w-full mt-4 bg-[#0d9488] hover:bg-[#0a6e64]"
            >
                Submit
            </Button>
        </Box>
    );
};

export default MaterialForm;
